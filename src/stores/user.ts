import { action, observable } from 'mobx';
import agent from '../services';
import { query as queryUsers, queryCurrent } from '../services/user';

export class UserStore {
  @observable vlist: any = [];
  @observable loading: boolean = false;
  @observable currentUser: any = {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png',
    userid: '00000001',
    notifyCount: 12,
  };

  @observable loadingUser;
  @observable updatingUser;
  @observable updatingUserErrors;

  @action
  pullUser() {
    this.loadingUser = true;
    return agent.Auth.current()
      .then(action(({user}) => {
        this.currentUser = user;
      }))
      .finally(action(() => {
        this.loadingUser = false;
      }));
  }

  @action
  updateUser(newUser) {
    this.updatingUser = true;
    return agent.Auth.save(newUser)
      .then(action(({user}) => {
        this.currentUser = user;
      }))
      .finally(action(() => {
        this.updatingUser = false;
      }));
  }

  @action
  forgetUser() {
    this.currentUser = undefined;
  }

  @action
  public fetchCurrent() {
    this.currentUser = {
      name: 'Serati Ma',
      avatar: 'https://gw.alipayobjects.com/zos/rmsportal/eHBsAsOrrJcnvFlnzNTT.png',
      userid: '00000001',
      notifyCount: 12,
    };
  }
}

export default new UserStore();
//
// export default {
//   namespace: 'user',
//
//   state: {
//     list: [],
//     loading: false,
//     currentUser: {},
//   },
//
//   effects: {
//     * fetch(_, {call, put}) {
//       yield put({
//         type: 'changeLoading',
//         payload: true,
//       });
//       const response = yield call(queryUsers);
//       yield put({
//         type: 'save',
//         payload: response,
//       });
//       yield put({
//         type: 'changeLoading',
//         payload: false,
//       });
//     },
//     * fetchCurrent(_, {call, put}) {
//       const response = yield call(queryCurrent);
//       yield put({
//         type: 'saveCurrentUser',
//         payload: response,
//       });
//     },
//   },
//
//   reducers: {
//     save(state, action) {
//       return {
//         ...state,
//         list: action.payload,
//       };
//     },
//     changeLoading(state, action) {
//       return {
//         ...state,
//         loading: action.payload,
//       };
//     },
//     saveCurrentUser(state, action) {
//       return {
//         ...state,
//         currentUser: action.payload,
//       };
//     },
//     changeNotifyCount(state, action) {
//       return {
//         ...state,
//         currentUser: {
//           ...state.currentUser,
//           notifyCount: action.payload,
//         },
//       };
//     },
//   },
// };
