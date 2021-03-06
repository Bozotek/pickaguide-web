import React from 'react';
import { browserHistory } from 'react-router';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { Information } from 'layout/elements/Information.jsx';
import { List } from 'layout/list/List.jsx';
import { OwnerAdvertPreview } from 'layout/user/OwnerAdvertPreview.jsx';
import { Layout } from 'layout/containers/Layout.jsx';
import { Button } from 'layout/elements/Button.jsx';
import { QueryModal } from 'modals/QueryModal.jsx';
import { Loader } from 'layout/elements/Loader.jsx';
import { ModalController } from 'base/ModalController.jsx';
import AdvertsStore from 'stores/user/Adverts.js';
import AdvertsActions from 'actions/Adverts.js';
import { strings } from './Adverts_lang.js';


export class Adverts extends StoreObserver {

  constructor(props, context) {
    super(props, context, AdvertsStore);

    this.state.adverts = null;
    this.reviewAdvert = this.reviewAdvert.bind(this);
    this.deleteAdCtrl = new ModalController();
  }

  componentDidMount() {
    super.componentDidMount();

    if (this.state.adverts === null) {
      AdvertsActions.get.defer();
    }
  }

  onStore(store) {
    if (store.adverts.every(advert => advert.ownerId === undefined)) {
      this.setState({ adverts: store.adverts });
    }
  }

  reviewAdvert(advertId) {
    browserHistory.push(`/guide/adverts/mine/${advertId}`);
  }

  navigateToAdCreation() {
    browserHistory.push('/guide/adverts/mine/new');
  }

  render() {
    const adverts = this.state.adverts;

    return (
      <div>
        <QueryModal
          controller={this.deleteAdCtrl}
          query={strings.deleteAdd}
          onConfirm={
            function confirm() {
              AdvertsActions.remove(this.deleteAdCtrl.callerId);
            }.bind(this)
          }
        />

        <Layout layoutStyle="LayoutBlank">
          <Title>{strings.title}</Title>
          <Button
            label={strings.new}
            buttonStyle="Auto Blue TextWhite Bold"
            onCallback={this.navigateToAdCreation}
          />
        </Layout>

        {
          adverts && adverts.length > 0 ?
            <Layout layoutStyle="LayoutBlank">
              <hr className="Overlay" />
              <List layoutStyle="LayoutLight" listStyle="ListGrid" elementStyle="Medium Tight Clickable">
                {
                  adverts.map((advert, index) => {
                    return <OwnerAdvertPreview {...advert} key={index} onClick={this.reviewAdvert} deleter={this.deleteAdCtrl} />;
                  })
                }
              </List>
            </Layout>
          :
            <Layout layoutStyle="LayoutBlank">
              <hr className="Overlay" />
              {
                adverts === null ?
                  <Loader />
                :
                  <div>
                    <Information infoStyle="Info Small MarginAuto LineSpaced">{strings.noAdd}</Information>
                    <Layout layoutStyle="LayoutRegular SoftShadowNonHover AutoWidthContent MarginAuto">
                      <p dangerouslySetInnerHTML={{ __html: strings.createAd }} / >
                    </Layout>
                  </div>
              }
            </Layout>
        }

      </div>
    );
  }
}
