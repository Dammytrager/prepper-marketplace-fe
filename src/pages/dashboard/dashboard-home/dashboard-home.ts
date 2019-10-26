import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../components/dashboard-header/dashboard-header.interface';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Label, Color} from 'ng2-charts';

@Component({
  selector: 'plm-dashboard-home',
  templateUrl: './dashboard-home.html'
})
export class DashboardHome implements OnInit, OnDestroy {

  dashboardHeaderdata: DashboardHeaderInterface = {
    bigHeader: 'Dashboard',
    smallHeader: 'Welcome back, we missed you!'
  };

  public lineChartData: ChartDataSets[] = [
    { data: [152, 130, 142, 130, 170, 188, 176], label: 'Sales' },
  ];
  public lineChartLabels: Label[] = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false
        }
      }],
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          display: false,
          suggestedMin: 0,
          beginAtZero: true
        }
      }]
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#42a5f5',
      backgroundColor: '#c8e2f8',
      pointRadius: 5,
      pointBorderColor: '#ffffff',
      pointBackgroundColor: '#42a5f5',
      borderWidth: 2
    },
  ];
  public lineChartColors2: Color[] = [
    {
      borderColor: '#9ccc65',
      backgroundColor: '#d2e8ba',
      pointRadius: 5,
      pointBorderColor: '#ffffff',
      pointBackgroundColor: '#9ccc65',
      borderWidth: 2
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() {}

  ngOnInit() {}

  ngOnDestroy() {}
}
