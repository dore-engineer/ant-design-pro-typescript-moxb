import { action, observable } from 'mobx';

export class LoginStore {

  @observable public submitting: boolean = false;
  @observable public status: any = null;
  @observable public count: number = 0;
  @observable public type: string = 'account';
  @observable public form: any = {};

  @action
  public accountSubmit(values: any) {
    console.log('values', values);
    this.submitting = true;
  }

  @action
  public changeLoginStatus() {
    this.status = true;
  }

  @action
  public logout() {
    this.status = false;
  }
}

export default new LoginStore();
// export default {
//   namespace: 'login',
//
//   state: {
//     status: undefined,
//   },
//
//   effects: {
//     * accountSubmit({payload}, {call, put}) {
//       yield put({
//         type: 'changeSubmitting',
//         payload: true,
//       });
//       const response = yield call(fakeAccountLogin, payload);
//       yield put({
//         type: 'changeLoginStatus',
//         payload: response,
//       });
//       yield put({
//         type: 'changeSubmitting',
//         payload: false,
//       });
//     },
//     * mobileSubmit(_, {call, put}) {
//       yield put({
//         type: 'changeSubmitting',
//         payload: true,
//       });
//       const response = yield call(fakeMobileLogin);
//       yield put({
//         type: 'changeLoginStatus',
//         payload: response,
//       });
//       yield put({
//         type: 'changeSubmitting',
//         payload: false,
//       });
//     },
//     * logout(_, {put}) {
//       yield put({
//         type: 'changeLoginStatus',
//         payload: {
//           status: false,
//         },
//       });
//       yield put(routerRedux.push('/user/login'));
//     },
//   },
//
//   reducers: {
//     changeLoginStatus(state, {payload}) {
//       return {
//         ...state,
//         status: payload.status,
//         type: payload.type,
//       };
//     },
//     changeSubmitting(state, {payload}) {
//       return {
//         ...state,
//         submitting: payload,
//       };
//     },
//   },
// };
