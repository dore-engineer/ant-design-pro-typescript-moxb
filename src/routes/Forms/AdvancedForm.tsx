import * as React from 'react';
import { Button, Card, Col, DatePicker, Form, Icon, Input, Popover, Row, Select, TimePicker } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import FooterToolbar from 'ant-design-pro/lib/FooterToolbar';
import TableForm from './TableForm';
import { FormComponentProps } from 'antd/lib/form';

import './style.less';

const {Option} = Select;
const {RangePicker} = DatePicker;

const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型'
};

const tableData = [{
  key: '1',
  workId: '00001',
  name: 'John Brown',
  department: 'New York No. 1 Lake Park'
}, {
  key: '2',
  workId: '00002',
  name: 'Jim Green',
  department: 'London No. 1 Lake Park'
}, {
  key: '3',
  workId: '00003',
  name: 'Joe Black',
  department: 'Sidney No. 1 Lake Park'
}];

interface AdvancedFormProps extends FormComponentProps {
  dispatch: any;
  submitting: boolean;
}

class AdvancedForm extends React.PureComponent<AdvancedFormProps, any> {
  render() {
    const {form, dispatch, submitting} = this.props;
    const {getFieldDecorator, validateFieldsAndScroll, getFieldsError} = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'form/submitAdvancedForm',
            payload: values
          });
        }
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = (fieldKey) => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map((key) => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={'errorListItem'} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={'errorIcon'}/>
            <div className={'errorMessage'}>{errors[key][0]}</div>
            <div className={'errorField'}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={'errorIcon'}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={'errorPopover'}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode as HTMLElement}
          >
            <Icon type="exclamation-circle"/>
          </Popover>
          {errorCount}
        </span>
      );
    };
    return (
      <PageHeaderLayout
        title="高级表单"
        content="高级表单常见于一次性输入和提交大批量数据的场景。"
        wrapperClassName={'advancedForm'}
      >
        <Card title="仓库管理" className={'card'} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.name}>
                  {getFieldDecorator('name', {
                    rules: [{required: true, message: '请输入仓库名称'}]
                  })(
                    <Input placeholder="请输入仓库名称"/>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
                <Form.Item label={fieldLabels.url}>
                  {getFieldDecorator('url', {
                    rules: [{required: true, message: '请选择'}]
                  })(
                    <Input
                      style={{width: '100%'}}
                      addonBefore="http://"
                      addonAfter=".com"
                      placeholder="请输入"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 8, offset: 2}} lg={{span: 10}} md={{span: 24}} sm={24}>
                <Form.Item label={fieldLabels.owner}>
                  {getFieldDecorator('owner', {
                    rules: [{required: true, message: '请选择管理员'}]
                  })(
                    <Select placeholder="请选择管理员">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.approver}>
                  {getFieldDecorator('approver', {
                    rules: [{required: true, message: '请选择审批员'}]
                  })(
                    <Select placeholder="请选择审批员">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
                <Form.Item label={fieldLabels.dateRange}>
                  {getFieldDecorator('dateRange', {
                    rules: [{required: true, message: '请选择生效日期'}]
                  })(
                    <RangePicker placeholder={['开始日期', '结束日期']} style={{width: '100%'}}/>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 8, offset: 2}} lg={{span: 10}} md={{span: 24}} sm={24}>
                <Form.Item label={fieldLabels.type}>
                  {getFieldDecorator('type', {
                    rules: [{required: true, message: '请选择仓库类型'}]
                  })(
                    <Select placeholder="请选择仓库类型">
                      <Option value="private">私密</Option>
                      <Option value="public">公开</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="任务管理" className={'card'} bordered={false}>
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.name2}>
                  {getFieldDecorator('name2', {
                    rules: [{required: true, message: '请输入'}]
                  })(
                    <Input placeholder="请输入"/>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
                <Form.Item label={fieldLabels.url2}>
                  {getFieldDecorator('url2', {
                    rules: [{required: true, message: '请选择'}]
                  })(
                    <Input placeholder="请输入"/>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 8, offset: 2}} lg={{span: 10}} md={{span: 24}} sm={24}>
                <Form.Item label={fieldLabels.owner2}>
                  {getFieldDecorator('owner2', {
                    rules: [{required: true, message: '请选择管理员'}]
                  })(
                    <Select placeholder="请选择管理员">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item label={fieldLabels.approver2}>
                  {getFieldDecorator('approver2', {
                    rules: [{required: true, message: '请选择审批员'}]
                  })(
                    <Select placeholder="请选择审批员">
                      <Option value="xiao">付晓晓</Option>
                      <Option value="mao">周毛毛</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 6, offset: 2}} lg={{span: 8}} md={{span: 12}} sm={24}>
                <Form.Item label={fieldLabels.dateRange2}>
                  {getFieldDecorator('dateRange2', {
                    rules: [{required: true, message: '请输入'}]
                  })(
                    <TimePicker
                      placeholder="{`提醒时间}"
                      style={{width: '100%'}}
                      getPopupContainer={trigger => trigger.parentNode as HTMLElement}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col xl={{span: 8, offset: 2}} lg={{span: 10}} md={{span: 24}} sm={24}>
                <Form.Item label={fieldLabels.type2}>
                  {getFieldDecorator('type2', {
                    rules: [{required: true, message: '请选择仓库类型'}]
                  })(
                    <Select placeholder="请选择仓库类型">
                      <Option value="private">私密</Option>
                      <Option value="public">公开</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="成员管理" className={'card'} bordered={false}>
          {getFieldDecorator('members', {
            initialValue: tableData
          })(<TableForm/>)}
        </Card>
        <FooterToolbar>
          {getErrorInfo()}
          <Button type="primary" onClick={validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}

// export default connect(state => ({
//   collapsed: state.global.collapsed,
//   submitting: state.form.advancedFormSubmitting,
// }))(Form.create<AdvancedFormProps>()(AdvancedForm));
