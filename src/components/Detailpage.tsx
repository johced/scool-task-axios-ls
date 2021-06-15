import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Animal } from '../models/Animal';

interface IParams {
  id: string;
}

export const DetailPage = () => {
  let { id } = useParams<IParams>();

  let defaultValue: Animal = {
    id: '',
    name: '',
    latinName: '',
    yearOfBirth: '',
    shortDescription: '',
    longDescription: '',
    imageUrl: '',
    medicine: '',
    isFed: false,
    lastFed: '',
  };
  const [animal, setAnimal] = useState(defaultValue);

  let animalsFromLS = localStorage.getItem('animals');
  const [animals, setAnimals] = useState(animalsFromLS);

  useEffect(() => {
    if (animalsFromLS !== null) {
      let animals = JSON.parse(animalsFromLS);

      for (let i = 0; i < animals.length; i++) {
        if (animals[i].id == id) {
          if (
            moment(animals[i].lastFed).isBefore(moment().subtract(3, 'hours'))
          ) {
            animals[i].isFed = false;
            localStorage.setItem('animals', JSON.stringify(animals));
            setAnimals(animals);
          }
          setAnimal(animals[i]);
        }
      }
    }
  }, [id, animalsFromLS]);

  function feedAnimal() {
    if (animalsFromLS !== null) {
      let animal = JSON.parse(animalsFromLS);
      for (let i = 0; i < animal.length; i++) {
        if (animal[i].id == id) {
          animal[i].isFed = true;
          animal[i].lastFed = new Date();
          localStorage.setItem('animals', JSON.stringify(animal));
          setAnimal(animal);
        }
      }
    }
  }

  const [varning, setVarning] = useState('');

  useEffect(() => {
    if (animalsFromLS !== null) {
      let animals = JSON.parse(animalsFromLS);

      for (let i = 0; i < animals.length; i++) {
        if (animals[i].id == id) {
          if (moment(animal.lastFed).isBefore(moment().subtract(4, 'hours'))) {
            setVarning('FEED ME NOW');
          }
        }
      }
    }
  });

  return (
    <div className='detail'>
      <h2>{animal.name}</h2>
      <img src={animal.imageUrl} alt='' width='200' />
      <p>
        <strong>Latin name: </strong> {animal.latinName}
      </p>
      <p>
        <strong>Description: </strong>
      </p>
      <p> {animal.longDescription}</p>
      <p>
        <strong>Need food? </strong> {animal.isFed ? 'No' : 'Yes'}
      </p>
      <button onClick={feedAnimal} disabled={animal.isFed}>
        Feed me now
      </button>
      <h3>{varning}</h3>
      <p>
        <strong>Last fed: </strong>
        {moment(animal.lastFed).format('MMMM Do YYYY, h:mm a')}
      </p>
      <Link to='/'>Tillbaka</Link>
    </div>
  );
};
