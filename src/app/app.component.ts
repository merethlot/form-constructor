import { Component, OnInit, ViewChild, ViewEncapsulation  } from '@angular/core';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { FieldConfig, editFieldConfig } from "./field.interface";
import { EditFormComponent } from "./components/edit-form/edit-form.component";
import {GroupComponent} from "./components/group/group.component";

@Component({
    selector: 'my-app',
    templateUrl: './app.template.html',
    styleUrls: ['app.style.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit { 
  @ViewChild(EditFormComponent) form: EditFormComponent;
  @ViewChild(GroupComponent) group: GroupComponent;
  
  public currentFormId:number;
  public formNumber:number = this.currentFormId;
  public ifEditElement:boolean = false;
  public ifEditGroup:boolean = false;

  private db:NgxIndexedDB;

  public elements_form:FieldConfig[]       = [];
  public elements_group:FieldConfig = {
      type: "group",
      label: "Group",
      elements: []
  }

  public currentElementConfig:editFieldConfig;

  public currentElementId:number;
  public currentGroupId:number;

  public currentForm:string;

  public regConfig: FieldConfig[] = [
    {
      type: "input",
      label: "Username",
      inputType: "text",
      default_value: ""
    },
    {
      type: "radiobutton",
      label: "Gender",
      options: ["Male", "Female"],
      default_value: "Male"
    },
    {
      type: "date",
      label: "DOB",
    },
    {
      type: "select",
      label: "Country",
      default_value: "UK",
      options: ["India", "UAE", "UK", "US"]
    },
    {
      type: "checkbox",
      label: "Accept Terms",
      default_value: true
    },
    {
      type: "button",
      label: "Save",
    },
    {
      type: "group",
      label: "Group",
      elements: []
    }
  ];

  constructor() {}

  getLastKey() {
    var last:string;
    this.db.openCursor('form_fields', (evt:any) => {
        var cursor = (<any>evt.target).result;
        if(cursor) {
            this.currentFormId = cursor.key;
            cursor.continue();
        } else {
            // console.log('Entries all displayed.');
        }
    });
  }

  addFormToBase(element:FieldConfig[]) {
    this.db.add('form_fields', { element: element }).then(
        () => {
            console.log('success');
            this.getLastKey();
        },
        (error:any) => {
            console.log(error);
        }
    );
  }

  loadForm(index:number) {
      if (typeof(index) == 'string') {index = parseInt(index);}
      this.currentFormId = index;
      this.db.getByKey('form_fields', index).then(
          (fields:any) => {
              this.elements_form = fields.element;
          },
          (error:any) => {
              console.log(error);
          }
      );

  }

  updateForm(element:FieldConfig[], index:number) {
    this.db.update('form_fields', { element: element, id: index }).then(
        () => {
            // Do something after update
        },
        (error :any)=> {
            console.log(error);
        }
    );
  }

  deleteElementFromBase(index:number) {
      this.db.delete('form_fields', index).then(
          () => {
              // Do something after delete
          },
          (error:any) => {
              console.log(error);
          }
      );
  }

  deleteElement(index:number, arr:FieldConfig[]) {
      arr.splice(index, 1);
      this.updateForm(this.elements_form, this.currentFormId);
  }


  deleteFromGroup(element:any) {
    console.log(element);
    this.elements_form[element.id] = element.el;
    this.updateForm(this.elements_form, this.currentFormId);
  }

  editInGroup(element:any) {
    console.log(element);
    this.ifEditElement = true;
    this.currentElementConfig = element.el;
    this.currentElementId = element.id;
    this.currentGroupId = element.index;
    this.ifEditGroup = true;
  }

  editElement(index:number, arr:FieldConfig[]) {
      this.ifEditElement = true;
      this.currentElementConfig = arr[index];
      this.currentElementId = index;
  }

  moveElement(item: any) {
    this.updateForm(this.elements_form, this.currentFormId);
  }

  dropElement(item: any, list: any[]) {
    list.splice(list.indexOf(item), 1);
    this.updateForm(this.elements_form, this.currentFormId);

  }

  ngOnInit(){
    this.db = new NgxIndexedDB('myDb', 1);
    this.db.openDatabase(1, (evt:any) => {
        let objectStore = evt.currentTarget.result.createObjectStore(
            'form_fields', { keyPath: "id", autoIncrement: true });

        objectStore.createIndex("element", "element", { unique: false });

    }).then(
      () => {
        this.addFormToBase(this.elements_form);
      }
    );
  }

  submitElement(value: any) {
      this.ifEditElement = false;
      if (this.elements_form[this.currentElementId].hasOwnProperty('elements') && this.ifEditGroup == true ) {
          this.elements_form[this.currentElementId].elements[this.currentGroupId].label = value.label;
          this.ifEditGroup = false;
      } else {
          this.elements_form[this.currentElementId].label = value.label;
      }

      this.updateForm(this.elements_form, this.currentFormId);
  }

  cancelForm() {
      this.ifEditElement = false;
  }


}