import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-group",
  template: `
    <div class="groupbox" >
      <div class="mat-caption">
        {{field.label}}
      </div>

      <div
        class="droplist">
          <div class="droplist-box" *ngFor="let field of field.elements; let i = index;" >
            <div class="icons">
              <mat-icon (click)="editElement(i)" color="primary" matTooltip="Edit inner element">edit</mat-icon>
              <mat-icon (click)="deleteElement(i)" color="primary" matTooltip="Delete inner element">delete</mat-icon>
           </div>

           <ng-container elementField [field]="field" >
           </ng-container>
        </div>

      </div>
    </div>
`,
  styles: []
})
export class GroupComponent implements OnInit {
  field: FieldConfig;
  // group: FormGroup;
  constructor() {}

  drop(event: Event) {
    console.log('aaa');
  }
  ngOnInit() {}
}
