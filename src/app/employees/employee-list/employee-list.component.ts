import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { EmployeeModel } from 'src/app/shared/employee.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  list: EmployeeModel[];
  constructor(
    private employeeService: EmployeeService,
    private toastr: ToastrService
    ) { }

  ngOnInit() {
    this.employeeService.getEmployees('').subscribe(res => {
      this.list = res.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as EmployeeModel
      })
    })
  }
  onEdit(emp: EmployeeModel){
    this.employeeService.formData = Object.assign({},emp);
  }
  onDelete(id: string){
    if(confirm("Are you sure to delete this record?")){
      this.employeeService.deleteEmployee(id);
      this.toastr.success("Employee başarıyla silindi.","Employee Silme");
    }
  }
}
