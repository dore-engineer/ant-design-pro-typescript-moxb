import { observable, action, reaction } from 'mobx';
import agent from '../services';
import userStore from './user';
import commonStore from './common';

export class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;
  @observable public authenticated;
  @observable public token = window.localStorage.getItem('jwt');

  @observable values = {
    username: '',
    email: '',
    password: '',
  };

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          this.authenticated = true;
          window.localStorage.setItem('jwt', token);
        } else {
          this.authenticated = false;
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

  @action
  setToken(token) {
    this.token = token;
  }

  @action
  setUsername(username) {
    this.values.username = username;
  }

  @action
  setEmail(email) {
    this.values.email = email;
  }

  @action
  setPassword(password) {
    this.values.password = password;
  }

  @action
  reset() {
    this.values.username = '';
    this.values.email = '';
    this.values.password = '';
  }

  @action
  login() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.login(this.values.email, this.values.password)
      .then(({user}) => this.setToken(user.token))
      .then(() => userStore.pullUser())
      .catch(action((err: any) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => {
        this.inProgress = false;
      }));
  }

  @action
  register() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.register(this.values.username, this.values.email, this.values.password)
      .then(({user}) => this.setToken(user.token))
      .then(() => userStore.pullUser())
      .catch(action((err: any) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => {
        this.inProgress = false;
      }));
  }

  @action
  logout() {
    this.setToken(undefined);
    userStore.forgetUser();
    return new Promise(res => res());
  }
}

export default new AuthStore();
