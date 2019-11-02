import {Component, OnDestroy, OnInit} from '@angular/core';
import {DashboardHeaderInterface} from '../../../components/dashboard-header/dashboard-header.interface';
import {SubheaderInterface} from '../../../components/subheader/subheader.interface';
import {SALES} from '../../../static/dummy/sales';
import {CURRENCY} from '../../../system/constants/static-content';
import {SalesInterface} from '../../../system/interfaces/sales.interface';

@Component({
  selector: 'plm-earnings',
  templateUrl: './earnings.html'
})
export class Earnings implements OnInit, OnDestroy {
  dashboardHeaderdata: DashboardHeaderInterface = {
    bigHeader: 'Earnings',
    smallHeader: '$15,000 Earned | $7,500 Paid'
  };

  subheaderData1: SubheaderInterface = {
    title: {
      text: `Sales (${SALES.length})`,
      icon: false
    },
    action: false
  };

  subheaderData2: SubheaderInterface = {
    title: {
      text: `Payments (7)`,
      icon: false
    },
    action: {
      template: true
    }
  };

  sales = SALES;
  currency = CURRENCY;

  constructor() {}

  ngOnInit() {}

  total = (sales: SalesInterface[]) => {
    let sum = 0;
    sales.forEach((sale) => sum += sale.price);
    return sum;
  }

  ngOnDestroy() {}
}
