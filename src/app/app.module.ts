import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AppComponent }   from './app.component';

import { MaterialModule } from "./material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "./components/input/input.component";
import { ButtonComponent } from "./components/button/button.component";
import { SelectComponent } from "./components/select/select.component";
import { DateComponent } from "./components/date/date.component";
import { RadiobuttonComponent } from "./components/radiobutton/radiobutton.component";
import { CheckboxComponent } from "./components/checkbox/checkbox.component";
import { GroupComponent } from "./components/group/group.component";
import { ElementFieldDirective } from "./components/element-field/element-field.directive";
import { EditFormComponent } from "./components/edit-form/edit-form.component";

@NgModule({
    imports:      [ 
    	BrowserAnimationsModule, 
    	BrowserModule, 
    	FormsModule,
        ReactiveFormsModule,
    	DragDropModule,
	    MaterialModule
    ],
    declarations: [ 
	    AppComponent,
	    InputComponent,
	    ButtonComponent,
	    SelectComponent,
	    DateComponent,
	    RadiobuttonComponent,
	    CheckboxComponent,
        GroupComponent,
        ElementFieldDirective,
        EditFormComponent
    ],
    bootstrap:    [ AppComponent ],
	entryComponents: [
		InputComponent,
		ButtonComponent,
		SelectComponent,
		DateComponent,
		RadiobuttonComponent,
		CheckboxComponent,
        GroupComponent
	]
})
export class AppModule { 

}