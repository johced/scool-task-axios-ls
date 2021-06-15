export class Animal {
  constructor(
    public id: string,
    public name: string,
    public latinName: string,
    public yearOfBirth: string,
    public shortDescription: string,
    public longDescription: string,
    public imageUrl: string,
    public medicine: string,
    public isFed: boolean,
    public lastFed: string
  ) {}
}
