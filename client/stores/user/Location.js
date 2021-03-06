import alt from 'client/alt';
import LocationActions from 'actions/Location.js';
import LocationApi from 'services/Location.js';


class LocationStore {

  constructor() {
    this.error = null;
    this.ownLocation = null;
    this.adsCoor = null;
    this.guideCoor = null;
    this.bindActions(LocationActions);
  }

  onSendLocation(coor) {
    LocationApi.sendLocation(coor);
    return false;
  }

  onSendLocationSuccess(res) {
    this.error = null;
    this.ownLocation = res;
  }

  onNearGuide() {
    LocationApi.nearGuide(0.01);
    return false;
  }

  onNearGuideSuccess(res) {
    this.error = null;
    this.guideCoor = res;
  }

  onNearAds() {
    LocationApi.nearAds(0.01);
    return false;
  }

  onNearAdsSuccess(res) {
    this.error = null;
    this.adsCoor = res;
  }

  onError(error) {
    this.error = error;
  }
}

export default alt.createStore(LocationStore, 'LocationStore');
