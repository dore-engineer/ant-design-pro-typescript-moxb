import { fakeChartData } from '../services/api';
import { action, observable } from 'mobx';
import { getFakeChartData } from '../mock/chart';
import { sleep } from '../utils/utils';

export class ChartStore {
  @observable public loading: boolean = true;
  @observable public salesType: string = 'all';
  @observable public currentTabKey: string = '';
  @observable public rangePickerValue: any = [];
  @observable public chart: any = {
    visitData: [],
    visitData2: [],
    salesData: [],
    searchData: [],
    offlineData: [],
    offlineChartData: [],
    salesTypeData: [],
    salesTypeDataOnline: [],
    salesTypeDataOffline: [],
    radarData: [],
  };

  @action
  public async fetch() {
    this.loading = true;
    await sleep(200);
    this.chart = getFakeChartData;
    this.loading = false;
  }

  @action
  public async fetchSaleData() {
    this.loading = true;
    await sleep(200);
    this.chart.salesData = getFakeChartData.salesData;
    this.loading = false;
  }

  @action
  public updateRangePicker(rangePickerValue) {
    this.rangePickerValue = rangePickerValue;
    this.fetchSaleData();
  }

  @action
  public clear() {
    this.chart = {
      visitData: [],
      visitData2: [],
      salesData: [],
      searchData: [],
      offlineData: [],
      offlineChartData: [],
      salesTypeData: [],
      salesTypeDataOnline: [],
      salesTypeDataOffline: [],
      radarData: [],
    };
  }
}

export default new ChartStore();
// export default {
//   namespace: 'chart',
//
//   state: {
//     visitData: [],
//     visitData2: [],
//     salesData: [],
//     searchData: [],
//     offlineData: [],
//     offlineChartData: [],
//     salesTypeData: [],
//     salesTypeDataOnline: [],
//     salesTypeDataOffline: [],
//     radarData: [],
//   },
//
//   effects: {
//     * fetch(_, {call, put}) {
//       const response = yield call(fakeChartData);
//       yield put({
//         type: 'save',
//         payload: response,
//       });
//     },
//     * fetchSalesData(_, {call, put}) {
//       const response = yield call(fakeChartData);
//       yield put({
//         type: 'save',
//         payload: {
//           salesData: response.salesData,
//         },
//       });
//     },
//   },
//
//   reducers: {
//     save(state, {payload}) {
//       return {
//         ...state,
//         ...payload,
//       };
//     },
//     setter(state, {payload}) {
//       return {
//         ...state,
//         ...payload,
//       };
//     },
//     clear() {
//       return {
//         visitData: [],
//         visitData2: [],
//         salesData: [],
//         searchData: [],
//         offlineData: [],
//         offlineChartData: [],
//         salesTypeData: [],
//         salesTypeDataOnline: [],
//         salesTypeDataOffline: [],
//         radarData: [],
//       };
//     },
//   },
// };
