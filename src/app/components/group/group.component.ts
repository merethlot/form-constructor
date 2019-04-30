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
    </div>

    <div
        cdkDropList
        [cdkDropListData]="field.elements"
        class="droplist"
        (cdkDropListDropped)="drop($event)">
        <div class="droplist-box" *ngFor="let field of field.elements; let i = index;" cdkDrag>
          <div class="icons">
            <mat-icon (click)="editElement(i)" color="accent">edit</mat-icon>
            <mat-icon (click)="deleteElement(i)" color="accent">delete</mat-icon>
         </div>
         <div class="droplist-custom-placeholder" *cdkDragPlaceholder></div>

         <ng-container elementField [field]="field" >
         </ng-container>
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
