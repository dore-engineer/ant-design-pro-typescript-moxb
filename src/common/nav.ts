import dynamic from 'dva/dynamic';

// wrapper of dynamic
const dynamicWrapper = (models, component) => dynamic({
  // models: () => models.map(m => import(`../models/${m}.tsx`)),
  component,
});

// nav data
export const getNavData = () => [
  {
    component: dynamicWrapper(['user', 'login'], () => import('../layouts/BasicLayout')),
    layout: 'BasicLayout',
    name: '首页', // for breadcrumb
    path: '/',
    children: [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        path: 'dashboard',
        children: [
          {
            name: '分析页',
            path: 'analysis',
            component: dynamicWrapper(['chart'], () => import('../routes/Dashboard/Analysis')),
          },
          {
            name: '监控页',
            path: 'monitor',
            component: dynamicWrapper(['monitor'], () => import('../routes/Dashboard/Monitor')),
          },
          {
            name: '工作台',
            path: 'workplace',
            component: dynamicWrapper(['project', 'activities', 'chart'], () => import('../routes/Dashboard/Workplace')),
          },
        ],
      },
      {
        name: '表单页',
        path: 'form',
        icon: 'form',
        children: [
          {
            name: '基础表单',
            path: 'basic-form',
            component: dynamicWrapper(['form'], () => import('../routes/Forms/BasicForm')),
          },
          {
            name: '分步表单',
            path: 'step-form',
            component: dynamicWrapper(['form'], () => import('../routes/Forms/StepForm')),
            children: [
              {
                path: 'confirm',
                component: dynamicWrapper(['form'], () => import('../routes/Forms/StepForm/Step2')),
              },
              {
                path: 'result',
                component: dynamicWrapper(['form'], () => import('../routes/Forms/StepForm/Step3')),
              },
            ],
          },
          {
            name: '高级表单',
            path: 'advanced-form',
            component: dynamicWrapper(['form'], () => import('../routes/Forms/AdvancedForm')),
          },
        ],
      },
      {
        name: '列表页',
        path: 'list',
        icon: 'table',
        children: [
          {
            name: '查询表格',
            path: 'table-list',
            component: dynamicWrapper(['rule'], () => import('../routes/List/TableList')),
          },
          {
            name: '标准列表',
            path: 'basic-list',
            component: dynamicWrapper(['list'], () => import('../routes/List/BasicList')),
          },
          {
            name: '卡片列表',
            path: 'card-list',
            component: dynamicWrapper(['list'], () => import('../routes/List/CardList')),
          },
          {
            name: '搜索列表（项目）',
            path: 'cover-card-list',
            component: dynamicWrapper(['list'], () => import('../routes/List/CoverCardList')),
          },
          {
            name: '搜索列表（应用）',
            path: 'filter-card-list',
            component: dynamicWrapper(['list'], () => import('../routes/List/FilterCardList')),
          },
          {
            name: '搜索列表（文章）',
            path: 'search',
            component: dynamicWrapper(['list'], () => import('../routes/List/SearchList')),
          },
        ],
      },
      {
        name: '详情页',
        path: 'profile',
        icon: 'profile',
        children: [
          {
            name: '基础详情页',
            path: 'basic',
            component: dynamicWrapper(['profile'], () => import('../routes/Profile/BasicProfile')),
          },
          {
            name: '高级详情页',
            path: 'advanced',
            component: dynamicWrapper(['profile'], () => import('../routes/Profile/AdvancedProfile')),
          },
        ],
      },
      {
        name: '结果',
        path: 'result',
        icon: 'check-circle-o',
        children: [
          {
            name: '成功',
            path: 'success',
            component: dynamicWrapper([], () => import('../routes/Result/Success')),
          },
          {
            name: '失败',
            path: 'fail',
            component: dynamicWrapper([], () => import('../routes/Result/Error')),
          },
        ],
      },
      {
        name: '异常',
        path: 'exception',
        icon: 'warning',
        children: [
          {
            name: '403',
            path: '403',
            component: dynamicWrapper([], () => import('../routes/Exception/403')),
          },
          {
            name: '404',
            path: '404',
            component: dynamicWrapper([], () => import('../routes/Exception/404')),
          },
          {
            name: '500',
            path: '500',
            component: dynamicWrapper([], () => import('../routes/Exception/500')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper([], () => import('../layouts/UserLayout')),
    path: '/user',
    layout: 'UserLayout',
    children: [
      {
        name: '帐户',
        icon: 'user',
        path: 'user',
        children: [
          {
            name: '登录',
            path: 'login',
            component: dynamicWrapper(['login'], () => import('../routes/User/Login')),
          },
          {
            name: '注册',
            path: 'register',
            component: dynamicWrapper(['register'], () => import('../routes/User/Register')),
          },
          {
            name: '注册结果',
            path: 'register-result',
            component: dynamicWrapper([], () => import('../routes/User/RegisterResult')),
          },
        ],
      },
    ],
  },
  {
    component: dynamicWrapper([], () => import('../layouts/BlankLayout')),
    layout: 'BlankLayout',
    children: {
      name: '使用文档',
      path: 'http://pro.ant.design/docs/getting-started',
      target: '_blank',
      icon: 'book',
    },
  },
];
