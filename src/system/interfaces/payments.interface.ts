import {Time} from '@angular/common';

export interface PaymentsInterface {
  id: string;
  status: 'pending' | 'completed' | 'canceled' | 'processing';
  date: string;
  time: number;
  processor: string;
  value: number;
}
