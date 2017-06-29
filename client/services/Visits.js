import VisitsActions from 'actions/Visits.js';
import PromiseApi from 'services/PromiseApi.js';


export default class VisitsApi {

  static visit(advertId, form) {
    PromiseApi.auth().post(`/proposals/${advertId}/visit`, form)
      .then((res) => {
        if (res.error) {
          VisitsActions.error(res.error);
        } else {
          VisitsActions.visitSuccess();
        }
      })
      .catch((err) => {
        VisitsActions.error(err);
      });
  }

  static get() {
    PromiseApi.auth().get('/visits')
      .then((res) => {
        if (res.error) {
          VisitsActions.error(res.error);
        } else {
          VisitsActions.getSuccess(res);
        }
      })
      .catch((err) => {
        VisitsActions.error(err);
      });
  }

  static findMine(visitId, type) {
    PromiseApi.auth().get(`/visits/${visitId}/${type}`)
      .then((res) => {
        if (res.error) {
          VisitsActions.error(res.error);
        } else {
          VisitsActions.findSuccess(res.visit);
        }
      })
      .catch((err) => {
        VisitsActions.error(err);
      });
  }

  static find(visitId) {
    PromiseApi.get(`/public/visits/${visitId}`)
      .then((res) => {
        if (res.error) {
          VisitsActions.error(res.error);
        } else {
          VisitsActions.findSuccess(res.visit);
        }
      })
      .catch((err) => {
        VisitsActions.error(err);
      });
  }

  static action(visitId, type, form) {
    PromiseApi.auth().put(`/visits/${visitId}/${type}`, form)
      .then((res) => {
        if (res.error) {
          console.log(res.error);
          VisitsActions.error(res.error);
        } else {
          VisitsActions.actionSuccess(res.visit);
        }
      })
      .catch((err) => {
        VisitsActions.error(err);
      });
  }

}