import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-select",
  template: `
    <mat-form-field class="full-width" >
    <mat-select [placeholder]="field.label" >
    <mat-option *ngFor="let item of field.options" [value]="item">{{item}}</mat-option>
    </mat-select>
    </mat-form-field>
    `,
    styles: [`
	.full-width,
    :host {
		width: 100%;
	}
  `]
})
export class SelectComponent implements OnInit {
  field: FieldConfig;
  // group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
