import * as React from 'react'
import { Form, Input, Button, Select, Divider } from 'antd';
import { routerRedux } from 'dva/router';
const styles = require('./style.less')

const { Option } = Select;

export default ({ formItemLayout, form, dispatch, data }) => {
  const { getFieldDecorator, validateFields } = form;
  const onValidateForm = () => {
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/saveStepFormData',
          payload: values,
        });
        dispatch(routerRedux.push('/form/step-form/confirm'));
      }
    });
  };
  return (
    <div>
      <Form layout="horizontal" className={styles.stepForm} hideRequiredMark>
        <Form.Item
          {...formItemLayout}
          label="付款账户"
        >
          {getFieldDecorator('payAccount', {
            initialValue: data.payAccount || 'ant-design@alipay.com',
            rules: [{ required: true, message: '请选择付款账户' }],
          })(
            <Select placeholder="test@example.com">
              <Option value="ant-design@alipay.com">ant-design@alipay.com</Option>
            </Select>
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="收款账户"
        >
          <Input.Group compact>
            <Select defaultValue="alipay" style={{ width: 100 }}>
              <Option value="alipay">支付宝</Option>
              <Option value="bank">银行账户</Option>
            </Select>
            {getFieldDecorator('receiverAccount', {
              initialValue: data.receiverAccount || 'test@example.com',
              rules: [
                { required: true, message: '请输入收款人账户' },
                { type: 'email', message: '账户名应为邮箱格式' },
              ],
            })(
              <Input style={{ width: 'calc(100% - 100px)' }} placeholder="test@example.com" />
            )}
          </Input.Group>
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="收款人姓名"
        >
          {getFieldDecorator('receiverName', {
            initialValue: data.receiverName || 'Alex',
            rules: [{ required: true, message: '请输入收款人姓名' }],
          })(
            <Input placeholder="请输入收款人姓名" />
          )}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="转账金额"
        >
          {getFieldDecorator('amount', {
            initialValue: data.amount || '500',
            rules: [
              { required: true, message: '请输入转账金额' },
              { pattern: /^(\d+)((?:\.\d+)?)$/, message: '请输入合法金额数字' },
            ],
          })(
            <Input prefix="￥" placeholder="请输入金额" />
          )}
        </Form.Item>
        <Form.Item
          wrapperCol={{
            xs: { span: 24, offset: 0 },
            sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span },
          }}
          label=""
        >
          <Button type="primary" onClick={onValidateForm}>
            下一步
          </Button>
        </Form.Item>
      </Form>
      <Divider  />
      <div className={styles.desc} style={{ margin: '40px 0 24px' }}>
        <h3>说明</h3>
        <h4>转账到支付宝账户</h4>
        <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
        <h4>转账到银行卡</h4>
        <p>如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。如果需要，这里可以放一些关于产品的常见问题说明。</p>
      </div>
    </div>
  );
};