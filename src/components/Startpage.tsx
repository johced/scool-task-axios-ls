import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Animal } from '../models/Animal';

export const Startpage = () => {
  let defaultValue: Animal[] = [];
  const [animals, setAnimals] = useState(defaultValue);
  let ifAnimalsFromLS = localStorage.getItem('animals');

  function getData() {
    if (!ifAnimalsFromLS) {
      axios
        .get('https://animals.azurewebsites.net/api/animals')
        .then((response) => {
          setAnimals(response.data);
          localStorage.setItem('animals', JSON.stringify(response.data));
        });
    } else {
      let animalsFromLS = JSON.parse(ifAnimalsFromLS);
      setAnimals(animalsFromLS);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  let liTag = animals.map((animal) => {
    return (
      <li key={animal.id}>
        <h3>{animal.name}</h3>
        <img src={animal.imageUrl} alt='' height='100px' />
        <p>{animal.shortDescription}</p>
        <Link to={'/animal/' + animal.id} className='showmore'>
          Visa mer
        </Link>
        <hr />
      </li>
    );
  });

  let varning = animals.map((animal) => {
    if (moment(animal.lastFed).isBefore(moment().subtract(4, 'hours'))) {
      return (
        <li key={animal.id}>
          <h3>{animal.name}</h3>
          <Link to={'/animal/' + animal.id} className='varningBtn'>
            Feed me now!
          </Link>
        </li>
      );
    }
  });

  return (
    <>
      <div className='container'>
        <div>
          <ul>{liTag}</ul>
        </div>
        <div className='hungry'>
          {varning.length > 0 ? <h3 className='danger'>Warning</h3> : null}
          <ul>{varning}</ul>
        </div>
      </div>
    </>
  );
};
