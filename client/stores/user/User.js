import alt from 'client/alt';
import UserActions from 'actions/User.js';
import UserApi from 'services/User.js';


class UserStore {

  constructor() {
    this.error = null;
    this.isGuide = false;
    this.bindActions(UserActions);
  }

  onIsGuide(userId) {
    UserApi.isGuide(userId);
    return false;
  }

  onBecomeGuide(formBecomeGuide) {
    UserApi.becomeGuide(formBecomeGuide);
    return false;
  }

  onIsGuideSuccess(isGuide) {
    this.isGuide = isGuide;
    this.error = null;
  }

  onRetire() {
    UserApi.retire();
    return false;
  }

  onDelete() {
    UserApi.delete();
    return false;
  }

  onError(error) {
    this.error = error;
  }

  onInvalidateUser() {
    this.error = null;
    this.isGuide = false;
  }
}

export default alt.createStore(UserStore, 'UserStore');
