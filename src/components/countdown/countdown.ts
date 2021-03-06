import { Component, Input, Output, EventEmitter } from '@angular/core';

/*
  Generated class for the Countdown component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'countdown',
  templateUrl: 'countdown.html'
})

export class CountdownComponent {
  // 父组件传递截止日期
  @Input() endDate: number;
  @Output() endDateChange: EventEmitter<any> = new EventEmitter<any>();

  // day差
  private day: number = 0;
  // 小时差
  private hour: number = 0;
  // 分钟差
  private minute: number = 0;
  // 秒数差
  private second: number = 0;

  private set diff(val) {
    this.day = Math.floor(val / (24 * 3600)) || 0;
    var leave1 = val % (24 * 3600);
    this.hour = Math.floor(leave1 / (3600)) || 0;
    var leave2 = leave1 % (3600);
    this.minute = Math.floor(leave2 / (60)) || 0;
    var leave3 = leave2 % (60);
    this.second = Math.round(leave3) || 0;
  }

  // 定时器
  private timer;
  // 每一秒更新时间差
  ngAfterViewInit() {
    this.timer = setInterval(() => {
      this.endDate -= 1;
      this.diff = this.endDate;
      this.endDateChange.emit(this.endDate);
    }, 1000);
  }

  // 销毁组件时清除定时器
  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
}