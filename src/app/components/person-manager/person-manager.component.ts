import { Person } from './../../models/person';
import { PersonServiceService } from './../../services/user-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-manager',
  templateUrl: './person-manager.component.html',
  styleUrls: ['./person-manager.component.css']
})
export class PersonManagerComponent implements OnInit {
  allPersons:Person[]=[];

  constructor(private personService: PersonServiceService) { }

  ngOnInit(): void {
   
    this.personService.GetAllPersonData().subscribe((data:Person[])=>{
      // debugger;
      this.allPersons=data;
    });
  }
  onDelete(id:any){
    this.personService.deleteAPerson(id);


  }
}
