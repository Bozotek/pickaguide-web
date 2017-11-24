import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalFormController } from 'base/ModalFormController.jsx';
import { FormController } from 'base/FormController.jsx';
import { PanelForm } from 'view/PanelForm.jsx';
import { TextInput } from 'form/TextInput.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Element } from 'layout/list/Element.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { ClickablePicture } from 'layout/user/ClickablePicture.jsx';
import { EditAdvertCover } from 'modals/EditAdvertCover.jsx';
import AdvertsActions from 'actions/Adverts.js';
import AdvertsStore from 'stores/user/Adverts.js';
import ProfileStore from 'stores/user/Profile.js';
import AdvertMap from 'layout/user/AdvertMap.jsx';

const defaultCoverUrl = 'http://www.newyorker.com/wp-content/uploads/2015/12/Veix-Goodbye-New-York-Color-1200.jpg';


export class CreateAdvert extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    const profile = ProfileStore.getState().profile;

    this.state = {
      advert: {
        url: defaultCoverUrl,
        city: profile.city,
        country: profile.country,
        location: '',
      },
    };

    this.ctrl = new FormController();
    this.ctrl.attachSubmit(this.onSubmit.bind(this));
    this.editCoverCtrl = new ModalFormController();
    this.editCoverCtrl.attachSubmit(this.updateCover.bind(this));
    this.timeoutChange = null;
  }

  onStore(store) {
    if (store.error) {
      this.ctrl.messageCallback({
        title: 'Some error occurred when creating your ad',
        content: String(store.error),
        type: 'Alert',
      }, false);
    } else {
      browserHistory.goBack();
    }
  }

  updateCover(form) {
    const newState = Object.assign({}, this.state);
    newState.advert.url = form.photoUrl;
    this.editCoverCtrl.closeAndReset();
    this.setState(newState);
  }

  onSubmit(form) {
    form.photoUrl = this.state.advert.url;
    AdvertsActions.create(form);
  }

  changeLocation(location) {
    if (this.timeoutChange) {
      clearTimeout(this.timeoutChange);
    }

    this.timeoutChange = setTimeout(() => {
      this.setState({ location });
      clearTimeout(this.timeoutChange);
      this.timeoutChange = null;
    }, 400);
  }

  changeCity(city) {
    if (this.timeoutChange) {
      clearTimeout(this.timeoutChange);
    }


    this.timeoutChange = setTimeout(() => {
      const advert = Object.assign({}, this.state.advert);
      advert.city = city;
      this.setState({ advert });
      clearTimeout(this.timeoutChange);
      this.timeoutChange = null;
    }, 400);
  }

  changeCountry(country) {
    if (this.timeoutChange) {
      clearTimeout(this.timeoutChange);
    }

    this.timeoutChange = setTimeout(() => {
      const advert = Object.assign({}, this.state.advert);
      advert.country = country;
      this.setState({ advert });
      clearTimeout(this.timeoutChange);
      this.timeoutChange = null;
    }, 400);
  }

  render() {
    const advert = this.state.advert || {};

    return (
      <div>
        <PanelForm controller={this.ctrl} layoutStyle="LayoutLight Tight" panelStyle="Large">
          <Title>Create Ad</Title>

          <ClickablePicture url={advert.url} onClick={this.editCoverCtrl.toggle} />

          <hr className="SpacedOverlay" />

          <TextInput label="title" value={advert.title} required />
          <TextInput label="city" value={advert.city} required onChange={this.changeCity.bind(this)} />
          <TextInput label="country" value={advert.country} required onChange={this.changeCountry.bind(this)} />
          <TextArea label="description" value={advert.description} required />
          <TextInput label="location" placeholder="Street Address" value={advert.location} onChange={this.changeLocation.bind(this)} />

          <Element elementStyle="Tight NoHorizontalWrap Clickable Height20">
            <AdvertMap zoom={12} location={this.state.location} city={advert.city} country={advert.country} />
          </Element>
        </PanelForm>

        <EditAdvertCover controller={this.editCoverCtrl} />
      </div>
    );
  }
}