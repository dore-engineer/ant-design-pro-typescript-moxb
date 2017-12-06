import * as React from 'react';
import { connect } from 'dva';
import { Card, Button, Icon, List } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';

import './CardList.less';
@connect(state => ({
  list: state.list,
}))
export default class CardList extends React.PureComponent<any, any> {
  componentDidMount() {
    this.props.dispatch({
      type: 'list/fetch',
      payload: {
        count: 8,
      },
    });
  }

  render() {
    const {list: {list, loading}} = this.props;

    const content = (
      <div className={'pageHeaderContent'}>
        <p>
          段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，
          提供跨越设计与开发的体验解决方案。
        </p>
        <div className={'contentLink'}>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/MjEImQtenlyueSmVEfUD.svg"/> 快速开始
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/NbuDUAuBlIApFuDvWiND.svg"/> 产品简介
          </a>
          <a>
            <img alt="" src="https://gw.alipayobjects.com/zos/rmsportal/ohOEPSYdDTNnyMbGuyLb.svg"/> 产品文档
          </a>
        </div>
      </div>
    );

    const extraContent = (
      <div className={'extraImg'}>
        <img alt="这是一个标题" src="https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png"/>
      </div>
    );

    return (
      <PageHeaderLayout
        title="卡片列表"
        content={content}
        extraContent={extraContent}
      >
        <div className={'cardList'}>
          <List
            rowKey="id"
            loading={loading}
            grid={{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}}
            dataSource={['', ...list]}
            renderItem={item => (item ? (
                <List.Item extra key={item.id}>
                  <Card hoverable className={'card'} actions={[<a key={'label'}>操作一</a>, <a key={'label'}>操作二</a>]}>
                    <Card.Meta
                      avatar={<img alt="" className={'cardAvatar'} src={item.avatar}/>}
                      title={<a href="#">{item.title}</a>}
                      description={(
                        <Ellipsis className={'item'} lines={3}>{item.description}</Ellipsis>
                      )}
                    />
                  </Card>
                </List.Item>
              ) : (
                <List.Item extra>
                  <Button type="dashed" className={'newButton'}>
                    <Icon type="plus"/> 新增产品
                  </Button>
                </List.Item>
              )
            )}
          />
        </div>
      </PageHeaderLayout>
    );
  }
}
