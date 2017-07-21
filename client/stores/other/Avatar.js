import alt from 'client/alt';
import AvatarActions from 'actions/SearchAvatar.js';


class SearchAvatarStore {

  constructor() {
    this.error = null;
    this.avatar = '';
    this.bindActions(AvatarActions);
    this.id = null;
  }

  onGetSuccess(avatarObj) {
    this.error = null;
    this.avatar = avatarObj.avatar;
    this.id = avatarObj.id;
  }

  onError(error) {
    this.error = error;
  }

  onInvalidate() {
    this.error = null;
    this.avatar = '';
    this.id = null;
  }

}

export default alt.createStore(SearchAvatarStore, 'SearchAvatarStore');
