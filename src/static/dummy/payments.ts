import {PaymentsInterface} from '../../system/interfaces/payments.interface';

export const PAYMENTS: PaymentsInterface[] = [
  {
    id: 'PAY.1850',
    status: 'canceled',
    date: '2017/10/26',
    time: 14,
    processor: 'Adam McCoy',
    value: 279
  },
  {
    id: 'PAY.1849',
    status: 'completed',
    date: '2017/10/25',
    time: 14,
    processor: 'Betty Kelley',
    value: 368
  },
  {
    id: 'PAY.1848',
    status: 'canceled',
    date: '2017/10/24',
    time: 14,
    processor: 'Lori Grant',
    value: 669
  },
  {
    id: 'PAY.1847',
    status: 'completed',
    date: '2017/10/23',
    time: 14,
    processor: 'Megan Fuller',
    value: 902
  },
  {
    id: 'PAY.1846',
    status: 'completed',
    date: '2017/10/22',
    time: 14,
    processor: 'Jack Estrada',
    value: 279
  },
  {
    id: 'PAY.1845',
    status: 'pending',
    date: '2017/10/21',
    time: 14,
    processor: 'Andrea Gardner',
    value: 932
  },
  {
    id: 'PAY.1844',
    status: 'processing',
    date: '2017/10/20',
    time: 14,
    processor: 'Amanda Powell',
    value: 777
  }
];
