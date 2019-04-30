import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from "../../field.interface";
@Component({
  selector: "app-radiobutton",
  template: `
	<div class="demo-full-width margin-top" >
	<label class="radio-label-padding">{{field.label}}:</label>
	<mat-radio-group class="droplist-radio-group">
	<mat-radio-button class="droplist-radio-button" *ngFor="let item of field.options" [value]="item">{{item}}</mat-radio-button>
	</mat-radio-group>
	</div>
	`,
  styles: [
  `
	.droplist-radio-group {
	  display: flex;
	  flex-direction: column;
	  margin: 15px 0;
	}

	.droplist-radio-button {
	  margin-bottom: 5px;
	}
  `
  ]
})
export class RadiobuttonComponent implements OnInit {
  field: FieldConfig;
  // group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
