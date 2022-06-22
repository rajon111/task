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
import { Route, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
const id = uuidv4();
@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {

  //not working 
  //   form: FormGroup<any>;
  //   submitted = false;
  //   addClicked=false;

  //   // EducationForm:FormGroup;


  //   constructor(private formBuilder: FormBuilder) {}

  //   ngOnInit(): void {

  //     // this.EducationForm=this.formBuilder.group(
  //     //   {
  //     //     name: ['',[
  //     //       Validators.required,
  //     //     ]],
  //     //     istitute: [
  //     //       '',
  //     //       [
  //     //         Validators.required,
  //     //       ]
  //     //     ],
  //     //     grade: [
  //     //       '',
  //     //       [
  //     //         Validators.required,
  //     //       ]
  //     //     ],
  //     //     from: [
  //     //       '',
  //     //       [
  //     //         Validators.required,
  //     //       ]
  //     //     ],
  //     //     to: [
  //     //       '',
  //     //       [
  //     //         Validators.required,
  //     //       ]
  //     //     ],

  //     //   }
  //     // )

  //     this.form = this.formBuilder.group(
  //       {
  //         name: ['',[
  //           Validators.required,
  //           // Validators.minLength(6),
  //           // Validators.maxLength(20)
  //         ]],
  //         phoneNumber: [
  //           '',
  //           [
  //             Validators.required,
  //             Validators.minLength(11),
  //             Validators.maxLength(14)
  //           ]
  //         ],

  //         email: ['', [Validators.required, Validators.email]],
  //         educationInfo: this.formBuilder.array([this.addEducationInfo()]),
  //       }
  //     );
  //   }

  //   addEducationInfo() {
  //     // const add = this.form.get('educationInfo') as FormArray;

  //      return this.formBuilder.group({
  //         name: [''],
  //         institute: [''],
  //         grade: [''],
  //         fromDate: [''],
  //         toDate: [''],
  //       })

  //   }

  // get educationIfos() {
  //   // return this.form.get('educationInfo') as FormArray;
  //   // return (this.form.get('educationInfo') as FormArray).controls;
  //   this.form.get('address').controls

  // }

  //   get f(): { [key: string]: AbstractControl } {
  //     return this.form.controls;
  //   }

  //   onSubmit(): void {
  //     this.submitted = true;

  //     if (this.form.invalid) {
  //       return;
  //     }

  //     console.log(JSON.stringify(this.form.value, null, 2));
  //   }

  //   onReset(): void {
  //     this.submitted = false;
  //     this.form.reset();
  //   }
  // addEdu()
  // {
  //   this.addClicked=true;
  // }
  myForm: FormGroup;

  constructor(private fb: FormBuilder,private personServide: PersonServiceService,private router:Router) {
  }

  ngOnInit() {
    // we will initialize our form here
    this.myForm = this.fb.group({

      name: ['', [
        Validators.required,
        // Validators.minLength(6),
        // Validators.maxLength(20)
      ]],
      id:[id],
      address: ['', [
        Validators.required,
        // Validators.minLength(6),
        // Validators.maxLength(20)
      ]],
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(14),
          Validators.pattern("[0-9 ]{11}")
        ]
      ],

      email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      educationaInfo: this.fb.array([
        this.initTimes()
      ])
    });
    this.fa.valueChanges.subscribe(value => {
      console.log('name has changed:', value)
    });
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

  // let dd = generateUniqueId() {
  //   return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  // }

  get fa() { return this.myForm.get('educationaInfo') as FormArray; }

  addGroup() {
    this.fa.push(this.initTimes());
  }

  removeGroup(i: number) {
    this.fa.removeAt(i);
  }

  onSubmit() {
    console.log('value: ', this.myForm.value);
    console.log('valid: ', this.myForm.valid);
    this.submitted = true;

      if (this.myForm.invalid) {
        return;
      }
      const dataP=this.myForm.value;
      const sentDat={id,...dataP}
      this.personServide.addPerson(sentDat);
      this.router.navigate(['/persons/admin']);

      
  }
     get f(): { [key: string]: AbstractControl } {
      return this.myForm.controls;
    }

    onReset(): void {
          this.submitted = false;
          this.myForm.reset();
        }
}
