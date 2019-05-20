import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
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

    <div class="droplist" [dndType]="field.type"
    [dndDraggable]
    [dndObject]="field">

    <div class="droplist" [dndList]="{
        allowedTypes: ['button', 'date', 'input', 'radiobutton', 'select', 'checkbox']}"
        [dndModel]="field.elements"
        [dndPlaceholder]="placeholder">       
            <div *ngFor="let item of field.elements; let i = index;" [dndType]="item.type"
            [dndDraggable]="{draggable:true, effectAllowed:'move'}"
            [dndObject]="item" class="droplist-box">
            <div class="icons">
              <mat-icon (click)="edit(i)" color="accent" matTooltip="Edit element">edit</mat-icon>
              <mat-icon (click)="delete(i)" color="accent" matTooltip="Delete element">delete</mat-icon>
            </div> 
              <ng-container elementField [field]="item" ></ng-container>

            </div>

    </div>
  </div>
  <div class="dndPlaceholder droplist-custom-placeholder"
  #placeholder></div>
`,
  styles: [`
    :host {
      width: 100%;
    }
  `]
})
export class GroupComponent implements OnInit {
  @Input() field: FieldConfig;
  @Input() fieldId:number;

  @Output() deleteFromGroup: EventEmitter<any> = new EventEmitter<any>();
  @Output() editInGroup: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  edit(index:number) {
    let tmp = {id: this.fieldId, el: this.field.elements[index], index: index}
    this.editInGroup.emit(tmp);

  }

  delete(index:number) {
    this.field.elements.splice(index, 1);
    let tmp = {id: this.fieldId, el: this.field};

    this.deleteFromGroup.emit(tmp);

  }



  ngOnInit() {}
}
