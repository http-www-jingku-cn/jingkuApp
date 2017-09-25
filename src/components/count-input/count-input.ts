import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Native } from "../../providers/native";

/*
  Generated class for the CountInput component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'count-input',
  templateUrl: 'count-input.html'
})
export class CountInputComponent {
  newmaxValue: number;

  @Input() value: number = 0;
  @Input() defaultValue: number = 0;
  @Input() lock: boolean = false;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();
  @Input() maxValue: number;

  defaultRank = 1;
  @Input() set rank(rank){
    console.log(rank)
    this.defaultRank = Number(rank) || this.defaultRank;
  }   


  disabled: boolean = false;
  constructor(
    private native: Native,
    private element: ElementRef,
  ) {
    // console.log('Hello CountInput Component');
  }
  ngOnInit() {
    console.log('增减量：' + this.defaultRank)
    if (this.maxValue) this.newmaxValue = this.maxValue;
    if (this.defaultRank !== 1) this.disabled = true;
  }
  increase() {
    if (this.lock) {
      return;
    } else if (this.newmaxValue && (this.value >= this.newmaxValue)) {
      this.native.showToast('最多选择' + this.newmaxValue + '件');
      this.element.nativeElement.getElementsByTagName('input')[0].value = this.newmaxValue;
      return;
    }
    this.valueChange.emit(this.value += this.defaultRank);
  }
  reduce() {
    if (this.value <= this.defaultValue) {
      return;
    }
    this.valueChange.emit(this.value -= this.defaultRank);
  }
  inputEvent(value) {
    if (this.newmaxValue && (this.value >= this.newmaxValue)) {
      this.native.showToast('最多选择' + this.newmaxValue + '件');
      this.element.nativeElement.getElementsByTagName('input')[0].value = this.newmaxValue;
      this.value = this.newmaxValue;
    }
    this.valueChange.emit(this.value);
  }

}