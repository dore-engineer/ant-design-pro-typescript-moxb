import { observable, action, reaction } from 'mobx';
import agent from '../services';

export class CommonStore {

  @observable public appName = 'Conduit';

  @observable public appLoaded = false;

  @observable public tags = [];
  @observable public isLoadingTags = false;
  @observable public collapsed: boolean = false;
  @observable public notices: any = [];
  @observable public fetchingNotices: boolean = false;

  @action
  public changeLayoutCollapsed(collapsed: boolean) {
    this.collapsed = collapsed;
  }

  @action
  loadTags() {
    this.isLoadingTags = true;
    return agent.Tags.getAll()
      .then(action(({tags}) => {
        this.tags = tags.map(t => t.toLowerCase());
      }))
      .finally(action(() => {
        this.isLoadingTags = false;
      }));
  }

  @action
  setAppLoaded() {
    this.appLoaded = true;
  }

}

export default new CommonStore();
