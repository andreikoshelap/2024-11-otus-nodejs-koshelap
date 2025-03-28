import { Component, OnInit } from '@angular/core';
// import { Test, TestService } from "./services/test.service";
// import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']  // corrected property name to styleUrls
})
export class AppComponent  {
  title = 'ui';
  // valueFromBackend: Observable<Test> | undefined ;
  //
  // constructor(private testService: TestService) { }
  //
  // ngOnInit(): void {
  //   this.valueFromBackend = this.testService.getUserByid(1);
  // }
}

