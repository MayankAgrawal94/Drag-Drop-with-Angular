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
	    x_axis : [null, Validators.compose([Validators.required,])],
	    y_axis : [null, Validators.compose([Validators.required,])],
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

  // onDragEnded(event) {
  //   console.log(event.source.getRootElement().getBoundingClientRect());
  // }

  onDragEnded(event) {
    let element = event.source.getRootElement();
    let boundingClientRect = element.getBoundingClientRect();
    console.log(boundingClientRect)
    // let dragX = (boundingClientRect.x - 649.59375)
    // let dragy = (boundingClientRect.y - 192.265625)
    // this.ControlForm.controls['x_axis'].setValue(dragX)
    // this.ControlForm.controls['y_axis'].setValue(dragy)
    // var testDiv = document.getElementById("inner-box")
    // console.log(testDiv.offsetTop)
    let parentPosition = this.getPosition(element);
    this.ControlForm.controls['x_axis'].setValue(boundingClientRect.x - parentPosition.left - 0.390625)
    this.ControlForm.controls['y_axis'].setValue(- (boundingClientRect.y - parentPosition.top - 0.265625 ) )
    // console.log('x: ' + (boundingClientRect.x - parentPosition.left), 'y: ' + (boundingClientRect.y - parentPosition.top));        
    this.cdr.detectChanges();
  }

  getPosition(el) {
    let x = 0;
    let y = 0;
    while(el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: y, left: x };
  }

}
