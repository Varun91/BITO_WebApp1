import { Component, ElementRef, ViewChild } from '@angular/core';
import { chart } from 'highcharts';
import {DemoService} from './app.service';
import * as Highcharts from 'highcharts';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-root1',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public metrics;

  @ViewChild('chartTarget') chartTarget: ElementRef;

  chart: Highcharts.ChartObject;

  constructor(private _demoService: DemoService) { }

   ngOnInit() {
    let timer = Observable.timer(0,10000);
    timer.subscribe(t=>this.getMetrics());
    
  }
 
  getMetrics() {
   this._demoService.getMetrics().subscribe(
      data => { this.metrics = data},
      err => console.error(err),
      () => this.refreshChart()
      
    );

  }
  
  refreshChart() {
    const options: Highcharts.Options = {
      title: {
        text: 'Time Series - Table 1'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Data Points'
        }
      },
      series: [{
                type: 'line',
                name: 'time',
                data: this.metrics
            }]
    };
  
    this.chart = chart(this.chartTarget.nativeElement, options);
  }

  saveMetrics(){
      this._demoService.saveMetrics(this.metrics).subscribe(
      data => console.log(data),
      err => console.error(err)
      
    );
  }
}
