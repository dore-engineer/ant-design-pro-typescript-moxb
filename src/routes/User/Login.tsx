import * as React from 'react';
// import { connect } from 'dva';
// import { routerRedux, Link } from 'dva/router';
import { Alert, Button, Checkbox, Col, Form, Icon, Input, Row, Tabs } from 'antd';

import './Login.less';
import { RouteComponentProps, withRouter } from 'react-router';
import { inject, observer } from 'mobx-react';
import { Keys } from '../../stores/index';
import { LoginStore } from '../../stores/login';
import { FormComponentProps } from 'antd/lib/form';
import { Link } from 'react-router-dom';

const FormItem = Form.Item;
const {TabPane} = Tabs;

interface LoginProps extends FormComponentProps, RouteComponentProps<any> {
  login: LoginStore;
}

@withRouter
@inject(Keys.login)
@Form.create<LoginProps>({
  onValuesChange: (props, values) => {
    console.log(props, values);
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        props.login.form[key] = values[key];
      }
    }

  }
})
@observer
export default class Login extends React.Component<LoginProps, any> {
  // state = {
  //   count: 0,
  //   type: 'account',
  private interval: any;
  onSwitch = (key) => {
    this.props.login.type = key;
  }
  onGetCaptcha = () => {
    let count = 59;
    this.props.login.count = count;
    this.interval = setInterval(() => {
      count -= 1;
      this.props.login.count = count;
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const {type} = this.props.login;
    this.props.form.validateFields({force: true},
      (err, values) => {
        if (!err) {
          this.props.login.accountSubmit(values);
        }
      }
    );
  }
  renderMessage = (message) => {
    return (
      <Alert
        style={{marginBottom: 24}}
        message={message}
        type="error"
        showIcon
      />
    );
  }

  // };

  componentWillReceiveProps(nextProps) {
    if (nextProps.login.status === 'ok') {
      // this.props.history.push('/');
      // this.props.dispatch(routerRedux.push('/'));
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {form, login} = this.props;
    const {getFieldDecorator} = form;
    const {count, type} = this.props.login;
    console.log('render login', this.props);
    return (
      <div className={'main'}>
        <Form onSubmit={this.handleSubmit}>
          <Tabs animated={false} className={'tabs'} activeKey={type} onChange={this.onSwitch}>
            <TabPane tab="账户密码登录" key="account">
              {
                login.status === 'error' &&
                login.type === 'account' &&
                login.submitting === false &&
                this.renderMessage('账户或密码错误')
              }
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{
                    required: type === 'account', message: '请输入账户名！'
                  }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" className={'prefixIcon'}/>}
                    placeholder="admin"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: type === 'account', message: '请输入密码！'
                  }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" className={'prefixIcon'}/>}
                    type="password"
                    placeholder="888888"
                  />
                )}
              </FormItem>
            </TabPane>
            <TabPane tab="手机号登录" key="mobile">
              {
                login.status === 'error' &&
                login.type === 'mobile' &&
                login.submitting === false &&
                this.renderMessage('验证码错误')
              }
              <FormItem>
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: type === 'mobile', message: '请输入手机号！'
                  }, {
                    pattern: /^1\d{10}$/, message: '手机号格式错误！'
                  }]
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="mobile" className={'prefixIcon'}/>}
                    placeholder="手机号"
                  />
                )}
              </FormItem>
              <FormItem>
                <Row gutter={8}>
                  <Col span={16}>
                    {getFieldDecorator('captcha', {
                      rules: [{
                        required: type === 'mobile', message: '请输入验证码！'
                      }]
                    })(
                      <Input
                        size="large"
                        prefix={<Icon type="mail" className={'prefixIcon'}/>}
                        placeholder="验证码"
                      />
                    )}
                  </Col>
                  <Col span={8}>
                    <Button
                      disabled={count > 0}
                      className={'getCaptcha'}
                      size="large"
                      onClick={this.onGetCaptcha}
                    >
                      {count ? `${count} s` : '获取验证码'}
                    </Button>
                  </Col>
                </Row>
              </FormItem>
            </TabPane>
          </Tabs>
          <FormItem className={'additional'}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox className={'autoLogin'}>自动登录</Checkbox>
            )}
            <a className={'forgot'} href="">忘记密码</a>
            <Button
              size="large"
              loading={login.submitting}
              className={'submit'}
              type="primary"
              htmlType="submit"
            >
              登录
            </Button>
          </FormItem>
        </Form>
        <div className={'other'}>
          其他登录方式
          {/* 需要加到 Icon 中 */}
          <span className={'iconAlipay'}/>
          <span className={'iconTaobao'}/>
          <span className={'iconWeibo'}/>
          <Link className={'register'} to="/user/register">注册账户</Link>
        </div>
      </div>
    );
  }
}
