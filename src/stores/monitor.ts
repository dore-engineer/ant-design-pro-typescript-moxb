import { action, observable } from 'mobx';

export class MonitorStore {

  @observable public tags: any = [{name: '@city', 'value|1-100': 150, 'type|0-2': 1}];

  // effects: {
  //   * fetchTags(_, {call, put}) {
  //     const response = yield call(queryTags);
  //     yield put({
  //       type: 'saveTags',
  //       payload: response.list,
  //     });
  //   },
  // },
  //
  // reducers: {
  //   saveTags(state, action) {
  //     return {
  //       ...state,
  //       tags: action.payload,
  //     };
  //   },
  // },
}

export default new MonitorStore();
