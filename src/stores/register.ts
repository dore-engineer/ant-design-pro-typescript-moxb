import { routerRedux } from 'dva/router';
import { action, observable } from "mobx";
import { sleep } from "../utils/utils";

export class RegisterStore {
  @observable public state: any = undefined;
  @observable public submitting: boolean = false;

  @action
  public changeSubmitting(submitting: boolean) {
    this.submitting = submitting;
  }

  @action
  public async submit(values) {
    this.changeSubmitting(true);
    console.log(values)
    await sleep(200);
    this.changeSubmitting(false);
  }
}

export default new RegisterStore();
//
// namespace: 'register',
//
//   state
// :
// {
//   status: undefined,
// }
// ,
//
// effects: {
// *
//   submit(_, {call, put})
//   {
//     yield put({
//       type: 'changeSubmitting',
//       payload: true,
//     });
//     const response = yield call(fakeRegister);
//     yield put({
//       type: 'registerHandle',
//       payload: response,
//     });
//     yield put({
//       type: 'changeSubmitting',
//       payload: false,
//     });
//   }
// ,
// }
// ,
//
// reducers: {
//   registerHandle(state, {payload})
//   {
//     return {
//       ...state,
//       status: payload.status,
//     };
//   }
// ,
//   changeSubmitting(state, {payload})
//   {
//     return {
//       ...state,
//       submitting: payload,
//     };
//   }
// ,
// }
// ,
// }
// ;
