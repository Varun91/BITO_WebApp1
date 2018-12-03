import { Component, ElementRef, ViewChild } from '@angular/core';
import { chart } from 'highcharts';
import {DemoService} from './app.service';
import * as Highcharts from 'highcharts';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-root2',
  templateUrl: './app.componenttwo.html',
  styleUrls: ['./app.component.css']
})
export class AppComponenttwo {
  public metrics;

  @ViewChild('chartTarget') chartTarget: ElementRef;

  chart: Highcharts.ChartObject;

  constructor(private _demoService: DemoService) { }

   ngOnInit() {
    this.getMetrics();
    
  }
 
  getMetrics() {
   this._demoService.getMetricsTable2().subscribe(
      data => { this.metrics = data},
      err => console.error(err),
      () => this.refreshChart()
      
    );

  }
  
  refreshChart() {
    const options: Highcharts.Options = {
      title: {
        text: 'Time Series - Table 2'
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

}
