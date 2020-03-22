import { Component, ChangeDetectorRef} from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'test01';
  dragPosition = {x: 0, y: 0};
  ControlForm : FormGroup;

  constructor(
  	private formbulider: FormBuilder, 
	private cdr: ChangeDetectorRef,
  ){  
	  this.ControlForm = this.formbulider.group({
	    x_axis : [null, Validators.compose([Validators.required, Validators.pattern(/^-?([1-9]\d*)?$/)])],
	    y_axis : [null, Validators.compose([Validators.required, Validators.pattern(/^-?([1-9]\d*)?$/)])],
	    width : [null, Validators.compose([Validators.required, Validators.pattern(/^-?([1-9]\d*)?$/), Validators.minLength(1)])],
	    height : [null, Validators.compose([Validators.required, Validators.pattern(/^-?([1-9]\d*)?$/), Validators.minLength(1)])],
	  });
	  this.ControlForm.controls['x_axis'].setValue(220)
	  this.ControlForm.controls['y_axis'].setValue(230)
	  this.ControlForm.controls['width'].setValue(150)
	  this.ControlForm.controls['height'].setValue(90)
	  this.dragPosition = {x: 220, y: 0 - 230};
  }

  changePosition(type, value) {
  	if(type == 'x'){
  		this.dragPosition = {x: value, y: this.dragPosition.y};
  	}else{
  		this.dragPosition = {x: this.dragPosition.x, y: 0 - value};
  	}
  	this.cdr.detectChanges();
  }
}
