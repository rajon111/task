import { EduQualification } from './../models/qualification';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../models/person';
@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {

  persons: Person[] = [
    {
      "id": "1",
      "name": "rajon",
      "address": "mir-11",
      "phoneNumber": "0172362362",
      "email": "b@gmail.com",
      "educationaInfo":[]
    }]

  personuSubject: BehaviorSubject<any> = new BehaviorSubject<any>(this.persons);

  constructor() { }

  GetAllPersonData() {
    return this.personuSubject.asObservable();
  }
  deleteAPerson(id:any) {
    const personsData = this.persons.filter((data: Person) => data.id !==id);
    this.personuSubject.next(personsData);
  }

  editPerson(person: Person) {
    // debugger;
    const filteredPerson = this.persons.filter((data: Person) => person.id === data.id)[0];
    const index = this.persons.indexOf(filteredPerson);
    if (index > -1) {
      const personsdata = [... this.persons];
      personsdata[index] = { ...person };
      this.personuSubject.next(personsdata);
    }
  }
  addPerson(person: Person) {
    const persons = [...this.persons];
    persons.push(person);
    this.personuSubject.next(persons);
  }


}
