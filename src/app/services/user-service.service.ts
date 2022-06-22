import { EduQualification } from './../models/qualification';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Person } from '../models/person';

@Injectable({
  providedIn: 'root'
})
export class PersonServiceService {

  persons: Person[] = [
    // {
    //   "id": "1",
    //   "name": "rajon",
    //   "address": "mir-11",
    //   "phoneNumber": "0172362362",
    //   "email": "b@gmail.com",
    //   "educationaInfo":[
        
    //     {
    //       "id":'1',
    //       "from":new Date(),
    //       "to":new Date(),
    //       "qualification":'test',
    //       "institute":'test',
    //       "grade":1,
    //     }
    //   ]
    // }
  ]

  personuSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor() { }

  GetAllPersonData() {
    return this.personuSubject.asObservable();
  }
  deleteAPerson(id:any) {
    const personsData = this.persons.filter((data: Person) => data.id !==id);
    this.personuSubject.next(personsData);
  }

  editPerson(person: Person) {
    debugger;
    const filteredPerson = this.persons.filter((data: Person) =>{
      console.log(data);
      return person.id==data.id;

    })[0];
    console.log(this.persons[0].id,person.id);
    const index = this.persons.indexOf(filteredPerson);
    if (index > -1) {
      const personsdata = [... this.persons];
      personsdata[index] = { ...person };
      this.personuSubject.next(personsdata);
    }
  }
  addPerson(person: Person) {
    this.persons.push(person)
    
    this.personuSubject.next([...this.persons]);
  }


}
