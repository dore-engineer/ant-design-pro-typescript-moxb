declare module "antd" {
  import { FormCreateOption, FormProps } from "antd/lib/form";
  import FormItem from "antd/lib/form/FormItem";
  export default class Form extends React.Component<FormProps, any> {
    static defaultProps: {
      prefixCls: string;
      layout: string;
      hideRequiredMark: boolean;
      onSubmit(e: React.FormEvent<HTMLFormElement>): void;
    };
    static propTypes: {
      prefixCls: any;
      layout: any;
      children: any;
      onSubmit: any;
      hideRequiredMark: any;
    };
    static childContextTypes: {
      vertical: any;
    };
    static Item: typeof FormItem;
    static createFormField: any;
    static create: <TOwnProps>(options?: FormCreateOption<TOwnProps>) => any;

    constructor(props: FormProps);

    shouldComponentUpdate(...args: any[]): any;

    getChildContext(): {
      vertical: boolean;
    };

    render(): JSX.Element;
  }
  export { default as Affix } from 'antd/lib/affix';
  export { default as Anchor } from 'antd/lib//anchor';
  export { default as AutoComplete } from 'antd/lib//auto-complete';
  export { default as Alert } from 'antd/lib//alert';
  export { default as Avatar } from 'antd/lib//avatar';
  export { default as BackTop } from 'antd/lib//back-top';
  export { default as Badge } from 'antd/lib//badge';
  export { default as Breadcrumb } from 'antd/lib//breadcrumb';
  export { default as Button } from 'antd/lib//button';
  export { default as Calendar } from 'antd/lib//calendar';
  export { default as Card } from 'antd/lib//card';
  export { default as Collapse } from 'antd/lib//collapse';
  export { default as Carousel } from 'antd/lib//carousel';
  export { default as Cascader } from 'antd/lib//cascader';
  export { default as Checkbox } from 'antd/lib//checkbox';
  export { default as Col } from 'antd/lib//col';
  export { default as DatePicker } from 'antd/lib//date-picker';
  export { default as Divider } from 'antd/lib//divider';
  export { default as Dropdown } from 'antd/lib//dropdown';
  export { Form } ;
  export { default as Icon } from 'antd/lib//icon';
  export { default as Input } from 'antd/lib//input';
  export { default as InputNumber } from 'antd/lib//input-number';
  export { default as Layout } from 'antd/lib//layout';
  export { default as List } from 'antd/lib//list';
  export { default as LocaleProvider } from 'antd/lib//locale-provider';
  export { default as message } from 'antd/lib//message';
  export { default as Menu } from 'antd/lib//menu';
  export { default as Modal } from 'antd/lib//modal';
  export { default as notification } from 'antd/lib//notification';
  export { default as Pagination } from 'antd/lib//pagination';
  export { default as Popconfirm } from 'antd/lib//popconfirm';
  export { default as Popover } from 'antd/lib//popover';
  export { default as Progress } from 'antd/lib//progress';
  export { default as Radio } from 'antd/lib//radio';
  export { default as Rate } from 'antd/lib//rate';
  export { default as Row } from 'antd/lib//row';
  export { default as Select } from 'antd/lib//select';
  export { default as Slider } from 'antd/lib//slider';
  export { default as Spin } from 'antd/lib//spin';
  export { default as Steps } from 'antd/lib//steps';
  export { default as Switch } from 'antd/lib//switch';
  export { default as Table } from 'antd/lib//table';
  export { default as Transfer } from 'antd/lib//transfer';
  export { default as Tree } from 'antd/lib//tree';
  export { default as TreeSelect } from 'antd/lib//tree-select';
  export { default as Tabs } from 'antd/lib//tabs';
  export { default as Tag } from 'antd/lib//tag';
  export { default as TimePicker } from 'antd/lib//time-picker';
  export { default as Timeline } from 'antd/lib//timeline';
  export { default as Tooltip } from 'antd/lib//tooltip';
  export { default as Mention } from 'antd/lib//mention';
  export { default as Upload } from 'antd/lib//upload';
  export { default as version } from 'antd/lib//version';

}