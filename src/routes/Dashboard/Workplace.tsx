import * as React from 'react';
import * as moment from 'moment';
import { Avatar, Card, Col, List, Row } from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import EditableLinkGroup from 'ant-design-pro/lib/EditableLinkGroup';
import { Radar } from 'ant-design-pro/lib/Charts';

import './Workplace.less';
import { Link } from 'react-router-dom';

const links = [
  {
    title: '操作一',
    href: ''
  },
  {
    title: '操作二',
    href: ''
  },
  {
    title: '操作三',
    href: ''
  },
  {
    title: '操作四',
    href: ''
  },
  {
    title: '操作五',
    href: ''
  },
  {
    title: '操作六',
    href: ''
  }
];

const members = [
  {
    id: 'members-1',
    title: '科学搬砖组',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
    link: ''
  },
  {
    id: 'members-2',
    title: '程序员日常',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
    link: ''
  },
  {
    id: 'members-3',
    title: '设计天团',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
    link: ''
  },
  {
    id: 'members-4',
    title: '中二少女团',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
    link: ''
  },
  {
    id: 'members-5',
    title: '骗你学计算机',
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
    link: ''
  }
];

// @connect(state => ({
//   project: state.project,
//   activities: state.activities,
//   chart: state.chart,
// }))
export default class Workplace extends React.PureComponent<any, any> {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'project/fetchNotice'
    });
    dispatch({
      type: 'activities/fetchList'
    });
    dispatch({
      type: 'chart/fetch'
    });
  }

  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'chart/clear'
    });
  }

  renderActivities() {
    const {
      activities: {list}
    } = this.props;
    return list.map((item) => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map((key) => {
        if (item[key]) {
          return <a href={item[key].link} key={item[key].name}>{item[key].name}</a>;
        }
        return key;
      });
      return (
        <List.Item key="workplace" extra>
          <List.Item.Meta
            key={item.id}
            avatar={<Avatar src={item.user.avatar}/>}
            title={
              <span>
                <a className={'username'}>{item.user.name}</a>
                &nbsp;
                <span className={'event'}>{events}</span>
              </span>
            }
            description={
              <span className={'datetime'} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>}
          />
        </List.Item>
      );
    });
  }

  render() {
    const {
      project: {loading: projectLoading, notice},
      activities: {loading: activitiesLoading},
      chart: {radarData}
    } = this.props;

    const pageHeaderContent = (
      <div className={'pageHeaderContent'}>
        <div className={'avatar'}>
          <Avatar size="large" src="https://gw.alipayobjects.com/zos/rmsportal/lctvVCLfRpYCkYxAsiVQ.png"/>
        </div>
        <div className={'content'}>
          <div className={'contentTitle'}>早安，曲丽丽，祝你开心每一天！</div>
          <div>交互专家 | 蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED</div>
        </div>
      </div>
    );

    const pageHeaderExtra = (
      <div className={'pageHeaderExtra'}>
        <div>
          <p>项目数</p>
          <p>56</p>
        </div>
        <div>
          <p>团队内排名</p>
          <p>8<span> / 24</span></p>
        </div>
        <div>
          <p>项目访问</p>
          <p>2,223</p>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout
        content={pageHeaderContent}
        extraContent={pageHeaderExtra}
      >
        <Row gutter={24}>
          <Col xl={16} lg={24} md={24} sm={24} xs={24}>
            <Card
              className={'projectList'}
              style={{marginBottom: 24}}
              title="进行中的项目"
              bordered={false}
              extra={<Link to="/">全部项目</Link>}
              loading={projectLoading}
              bodyStyle={{padding: 0}}
            >
              {
                notice.map(item => (
                  <Card.Grid className={'projectGrid'} key={item.id}>
                    <Card bodyStyle={{padding: 0}} bordered={false}>
                      <Card.Meta
                        title={(
                          <div className={'cardTitle'}>
                            <Avatar size="small" src={item.logo}/>
                            <Link to={item.href}>{item.title}</Link>
                          </div>
                        )}
                        description={item.description}
                      />
                      <div className={'projectItemContent'}>
                        <Link to={item.memberLink}>{item.member || ''}</Link>
                        {item.updatedAt && (
                          <span className={'datetime'} title={item.updatedAt}>
                            {moment(item.updatedAt).fromNow()}
                          </span>
                        )}
                      </div>
                    </Card>
                  </Card.Grid>
                ))
              }
            </Card>
            <Card
              bodyStyle={{padding: 0}}
              bordered={false}
              className={'activeCard'}
              title="动态"
              loading={activitiesLoading}
            >
              <List
                dataSource={''}
                loading={activitiesLoading}
                size="large"
                renderItem={() => <div className={'activitiesList'}>
                  {this.renderActivities()}
                </div>}
              />
            </Card>
          </Col>
          <Col xl={8} lg={24} md={24} sm={24} xs={24}>
            <Card
              style={{marginBottom: 24}}
              title="快速开始 / 便捷导航"
              bordered={false}
              bodyStyle={{padding: 0}}
            >
              <EditableLinkGroup
                onAdd={() => {
                  alert('Add');
                }}
                links={links}
                linkElement={Link}
              />
            </Card>
            <Card
              style={{marginBottom: 24}}
              bordered={false}
              title="XX 指数"
              loading={radarData.length === 0}
            >
              <div className={'chart'}>
                <Radar hasLegend height={343} data={radarData}/>
              </div>
            </Card>
            <Card
              bodyStyle={{paddingTop: 12, paddingBottom: 12}}
              bordered={false}
              title="团队"
            >
              <div className={'members'}>
                <Row gutter={48}>
                  {
                    members.map(item => (
                      <Col span={12} key={`members-item-${item.id}`}>
                        <Link to={item.link}>
                          <Avatar src={item.logo} size="small"/>
                          <span className={'member'}>{item.title}</span>
                        </Link>
                      </Col>
                    ))
                  }
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
