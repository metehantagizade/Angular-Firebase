import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { EmployeeModel } from 'src/app/shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(
    private employeeService: EmployeeService,
    private fireStore: AngularFirestore,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if(form != null)
      form.resetForm();

    this.employeeService.formData = {
      empCode: '',
      fullName: '',
      id: null,
      mobile: '',
      position: ''
    }
    
  }

  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    
    if(form.value.id === null){
      this.employeeService.addEmployee(data);
      this.toastr.success("İşlem Başarıyla Tamamlandı","Employee Ekle");
      this.resetForm(form);
    }
    else
    {
      this.employeeService.updateEmployee(data);
      this.toastr.success("İşlem Başarıyla Tamamlandı","Employee Güncelleme");
      this.resetForm(form);
    }
    
  }

}
