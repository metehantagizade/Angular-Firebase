import { Injectable } from '@angular/core';
import { EmployeeModel } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, observable } from 'rxjs';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: EmployeeModel;
  constructor(private fireStore: AngularFirestore) { }

  getEmployees(fullName?: string) {
    return this.fireStore.collection('employees' , ref=> {
      let query : firebase.firestore.CollectionReference | firebase.firestore.Query = ref;
      
      if (fullName) { query = query.where('fullName', '==', fullName) };
      if (true) { query = query.limit(4) };
      return query;
    }).snapshotChanges();
  }

  addEmployee(data: EmployeeModel) : Promise<string>{
    delete data.id;
    return this.fireStore.collection('employees').add(data).then(resolve => {return 'good'} , reject => {return 'error'}).catch(reject=> {return 'error'});
  }

  updateEmployee(data: EmployeeModel){
    this.fireStore.doc('employees/' + data.id).update(data);
  }

  deleteEmployee(id: string){
    this.fireStore.doc('employees/'+ id).delete();
  }
}
