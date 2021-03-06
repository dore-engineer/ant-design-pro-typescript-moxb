import * as React from 'react';
import { Link } from 'react-router-dom';
import PageHeader from 'ant-design-pro/lib/PageHeader';
import './PageHeaderLayout.less';

export default class PageHeaderLayout extends React.PureComponent<any, any> {
  render() {
    return (
      <div style={{margin: '-24px -24px 0'}} className={this.props.wrapperClassName}>
        {top}
        <PageHeader {...this.props.restProps} linkElement={Link}/>
        {this.props.children ? <div className="content">{this.props.children}</div> : null}
      </div>
    );
  }
}
// export default ({ children, wrapperClassName, top, ...restProps }) => (
//   <div style={{ margin: '-24px -24px 0' }} className={wrapperClassName}>
//     {top}
//     <PageHeader {...restProps} linkElement={Link} />
//     {children ? <div className={styles.content}>{children}</div> : null}
//   </div>
// );
