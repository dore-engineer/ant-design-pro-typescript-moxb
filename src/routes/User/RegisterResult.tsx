import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import Result from 'ant-design-pro/lib/Result';

import './RegisterResult.less';

const title = <div className={'title'}>你的账户：AntDesign@example.com 注册成功</div>;

const actions = (
  <div className={'actions'}>
    <a href=""><Button size="large" type="primary">查看邮箱</Button></a>
    <Link to="/"><Button size="large">返回首页</Button></Link>
  </div>
);

export default () => (
  <Result
    className={'registerResult'}
    type="success"
    title={title}
    description="激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。"
    actions={actions}
    style={{marginTop: 56}}
  />
);
