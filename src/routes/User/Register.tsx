import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Form, Input, Popover, Progress, Row, Select } from 'antd';

import './Register.less';
import { inject } from 'mobx-react';
import { Keys } from '../../stores/index';
import { RegisterStore } from '../../stores/register';
import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';

const {Option} = Select;

const passwordStatusMap = {
  ok: <div className={'success'}>Mật khẩu: Mạnh</div>,
  pass: <div className={'warning'}>Mật khẩu: Vừa</div>,
  pool: <div className={'error'}>Mật khẩu: Quá ngắn</div>
};

const passwordProgressMap = {
  ok: 'success',
  pass: 'normal',
  pool: 'exception'
};

interface RegisterProps extends FormComponentProps, RouteComponentProps<any> {
  register: RegisterStore;
}

@inject(Keys.register)
@Form.create()
export default class Register extends React.Component<RegisterProps, any> {
  interval: any;
  state = {
    count: 0,
    confirmDirty: false,
    visible: false,
    help: ''
  };
  onGetCaptcha = () => {
    let count = 59;
    this.setState({count});
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({count});
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }
  getPasswordStatus = () => {
    const {form} = this.props;
    const value = form.getFieldValue('password');
    if (value && value.length > 9) {
      return 'ok';
    }
    if (value && value.length > 5) {
      return 'pass';
    }
    return 'pool';
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields({force: true},
      (err, values) => {
        if (!err) {
          this.props.register.submit(values);
        }
      }
    );
  }
  handleConfirmBlur = (e) => {
    const {value} = e.target;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  }
  checkConfirm = (rule, value, callback) => {
    const {form} = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不匹配!');
    } else {
      callback();
    }
  }
  checkPassword = (rule, value, callback) => {
    if (!value) {
      this.setState({
        help: '请输入密码！',
        visible: !!value
      });
      callback('error');
    } else {
      this.setState({
        help: ''
      });
      if (!this.state.visible) {
        this.setState({
          visible: !!value
        });
      }
      if (value.length < 6) {
        callback('error');
      } else {

        if (value && this.state.confirmDirty) {
          this.props.form.validateFields(['confirm'], {force: true}, (errors, values) => {
            console.log(values);
          });
        }
        callback();
      }
    }
  }
  renderPasswordProgress = () => {
    const {form} = this.props;
    const value = form.getFieldValue('password');
    const passwordStatus = this.getPasswordStatus();
    return value && value.length ? (
      <div
        className={`progress-${passwordStatus}`}
      >
        <Progress
          status={passwordProgressMap[passwordStatus] as any}
          className={'progress'}
          strokeWidth={6}
          percent={value.length * 10 > 100 ? 100 : value.length * 10}
          showInfo={false}
        />
      </div>) : null;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.register.status === 'ok') {
      this.props.history.push('/user/register-result');
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {form, register} = this.props;
    const {getFieldDecorator} = form;
    const {count} = this.state;
    return (
      <div className={'main'}>
        <h3>注册</h3>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item>
            {getFieldDecorator('mail', {
              rules: [{
                required: true, message: '请输入邮箱地址！'
              }, {
                type: 'email', message: '邮箱地址格式错误！'
              }]
            })(
              <Input size="large" placeholder="邮箱"/>
            )}
          </Form.Item>
          <Form.Item help={this.state.help}>
            <Popover
              content={
                <div style={{padding: '4px 0'}}>
                  {passwordStatusMap[this.getPasswordStatus()]}
                  {this.renderPasswordProgress()}
                  <div style={{marginTop: 10}}>Please enter at least 6 characters. Please do not use easily guessed
                    passwords.
                  </div>
                </div>}
              overlayStyle={{width: 240}}
              placement="right"
              visible={this.state.visible}
            >
              {getFieldDecorator('password', {
                rules: [{
                  validator: this.checkPassword
                }]
              })(
                <Input
                  size="large"
                  type="password"
                  placeholder="至少6位密码，区分大小写"
                />
              )}
            </Popover>
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: '请确认密码！'
              }, {
                validator: this.checkConfirm
              }]
            })(
              <Input
                size="large"
                type="password"
                placeholder="确认密码"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Input.Group size="large" className={'mobileGroup'} compact>
              <Form.Item style={{width: '20%'}}>
                {getFieldDecorator('prefix', {
                  initialValue: '86'
                })(
                  <Select size="large">
                    <Option value="86">+86</Option>
                    <Option value="87">+87</Option>
                  </Select>
                )}
              </Form.Item>
              <Form.Item style={{width: '80%'}}>
                {getFieldDecorator('mobile', {
                  rules: [{
                    required: true, message: '请输入手机号！'
                  }, {
                    pattern: /^1\d{10}$/, message: '手机号格式错误！'
                  }]
                })(
                  <Input placeholder="11位手机号"/>
                )}
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item>
            <Row gutter={8}>
              <Col span={16}>
                {getFieldDecorator('captcha', {
                  rules: [{
                    required: true, message: '请输入验证码！'
                  }]
                })(
                  <Input
                    size="large"
                    placeholder="验证码"
                  />
                )}
              </Col>
              <Col span={8}>
                <Button
                  size="large"
                  disabled={count > 0}
                  className="getCaptcha"
                  onClick={this.onGetCaptcha}
                >
                  {count ? `${count} s` : '获取验证码'}
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item>
            <Button
              size="large"
              loading={register.submitting}
              className={'submit'}
              type="primary"
              htmlType="submit"
            >
              注册
            </Button>
            <Link className={'login'} to="/user/login">使用已有账户登录</Link>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
