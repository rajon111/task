import { EduQualification } from './qualification';
export interface Person{
    "id"?:string,
    "name":string,
    "address":string,
    "phoneNumber":string,
    "email":string,
    "educationaInfo": EduQualification[]
}