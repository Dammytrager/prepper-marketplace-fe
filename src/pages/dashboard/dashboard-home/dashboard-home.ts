import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../components/dashboard-header/dashboard-header.interface';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {Label, Color} from 'ng2-charts';
import {select} from '@angular-redux/store';
import {Observable, Subscription} from 'rxjs';
import {SUBJECT} from '../../../system/constants/static-content';
import {CoursePackData} from '../../../components/courses/courses.interface';
import {SubjectService} from '../../../system/services/subject.service';

@Component({
  selector: 'plm-dashboard-home',
  templateUrl: './dashboard-home.html'
})
export class DashboardHome implements OnInit, OnDestroy {
  @select(['dashboard', 'coursepacks']) coursepacks$: Observable<any>;
  @select(['dashboard', 'coursepacksLength']) coursepacksLength$: Observable<any>;
  $coursepacks$: Subscription;
  $coursepacksLength$: Subscription;
  coursepacks = [];
  coursepacksLength = 0;
  approvedCourses = 0;
  showLoading = true;

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

  constructor(private _subject: SubjectService) {
    this._subject.getSubjects().then((data: any) => {
      this.showLoading = false;
    });
  }

  ngOnInit() {
    this.$coursepacks$ = this.coursepacks$.subscribe((data: any) => {
      this.coursepacks = data;
      this.approvedCourses = this.approvedCoursepacks(this.coursepacks).length;
    });
    this.$coursepacksLength$ = this.coursepacksLength$.subscribe((data: any) => {
      this.coursepacksLength = data;
    });
  }

  approvedCoursepacks(courses: CoursePackData[]) {
    return courses.filter((course) => {
      return course.approve;
    });
  }

  ngOnDestroy() {}
}
