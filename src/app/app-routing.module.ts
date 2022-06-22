import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPersonComponent } from './components/add-person/add-person.component';
import { EditPersonComponent } from './components/edit-person/edit-person.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PersonManagerComponent } from './components/person-manager/person-manager.component';

const routes: Routes = [
  {path:'', redirectTo:'persons/admin', pathMatch:'full' },
  {path:'persons/admin', component:PersonManagerComponent },
  {path:'persons/add', component:AddPersonComponent },
  {path:'persons/edit/:id', component:EditPersonComponent },
  {path:'**', component:PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
