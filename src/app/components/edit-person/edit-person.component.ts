import { Person } from './../../models/person';
import { PersonServiceService } from './../../services/user-service.service';
import { EduQualification } from './../../models/qualification';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';


@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css']
})
export class EditPersonComponent implements OnInit {

  myForm: FormGroup;
  id: string;
  person: any;
  allPersons = [];

  constructor(private fb: FormBuilder, private personServide: PersonServiceService, private router: Router, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.personServide.GetAllPersonData().subscribe(data => {
      this.allPersons = data;
    });
    this.activeRoute.params.subscribe((params) => {

      this.id = params['id'];
      this.person = this.allPersons.filter((data: Person) => data.id === this.id)[0];
    })
    this.myForm = this.createEditForm();

    this.fa.valueChanges.subscribe(value => {
      console.log('name has changed:', value)
    });
  }

  createEditForm() {
    const form = this.fb.group({
      id:[this.person?.id??''],
      name: [this.person?.name ?? '', [
        Validators.required,
      ]],
      // address: [
      //   this.person?.address ?? '',
      //   [
      //     Validators.required
      //   ]
      // ],
      phoneNumber: [
        this.person?.phoneNumber ?? '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14)
        ]
      ],

      email: [this.person?.email ?? '', [Validators.required, Validators.email]],
      educationaInfo: this.fb.array([
        this.initTimes()
      ])
    });
    // debugger
    console.log(this.person);
    return form;

  }

  trackByFn(index: number, item: any) {
    return item.trackingId;
  }
  submitted = false;
  initTimes() {
    return this.fb.group({
      from: this.fb.control('', Validators.required),
      to: this.fb.control('', Validators.required),
      qualification: this.fb.control('', Validators.required),
      institute: this.fb.control('', Validators.required),
      grade: this.fb.control('', Validators.required),
    });
  }

  generateUniqueId() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  get fa() { return this.myForm.get('educationaInfo') as FormArray; }

  addGroup() {
    this.fa.push(this.initTimes());
  }

  removeGroup(i: number) {
    this.fa.removeAt(i);
  }

  onSubmit() {
    debugger;
    
    this.submitted = true;

    if (this.myForm.invalid) {
      return;
    }
    const data = { ...this.myForm.value }
    console.log("data",data);
    
    data.id=this.id;
    debugger;
    console.log('value: ', this.myForm.value);
    console.log('valid: ', this.myForm.valid);

    this.personServide.editPerson(this.myForm.value);
    this.router.navigate(['/persons/admin']);


  }
  get f(): { [key: string]: AbstractControl } {
    return this.myForm.controls;
  }



}
