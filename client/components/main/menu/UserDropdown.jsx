import React from 'react';
import { Link } from 'react-router';

import AuthActions from 'actions/Auth.js';
import UserActions from 'actions/User.js';
import ProfileStore from 'stores/user/Profile.js';
import AuthStore from 'stores/user/Auth.js';
import { AuthDependent } from 'base/AuthDependent.jsx';
import { GuideDependent } from 'base/GuideDependent.jsx';
import { StoreObserver } from 'base/StoreObserver.jsx';

import 'scss/main/menu/main.scss';


export class UserDropdown extends StoreObserver {

  constructor(props, context) {
    super(props, context, ProfileStore);

    const profile = ProfileStore.getState().profile || { photoUrl: '' };
    this.state = { url: profile.photoUrl };
    this.onStoreChange = this.onStoreChange.bind(this);
    AuthActions.sync();
  }

  onStoreChange(store) {
    const stateCopy = Object.assign({}, this.state);

    if (store.profile) {
      stateCopy.url = store.profile.photoUrl;
      this.updateState(stateCopy);
    }
  }

  render() {
    let profileLink = '';

    if (AuthStore.getState().credentials) {
      profileLink = `/profiles/${AuthStore.getState().credentials.id}`;
    }

    return (
      <AuthDependent className="AccountLogo" {...this.props}>
        <Link to={profileLink}>
          <img src={this.state.url} alt="Profile" />
        </Link>

        <div className="Dropdown HeightNone">
          <Link to="/settings/edit"><p>Settings</p></Link>
          <Link to="/account/edit"><p>Account</p></Link>
          <Link to="/profile/edit"><p>Profile</p></Link>

          <GuideDependent guide>
            <Link to="/guide/adverts"><p>Adverts</p></Link>
            <Link to="/guide/quit"><p className="alert" onClick={UserActions.retire}>Retire</p></Link>
          </GuideDependent>

          <GuideDependent visitor>
            <Link to="/guide/become"><p className="action">Be a guide</p></Link>
          </GuideDependent>
        </div>
      </AuthDependent>
    );
  }
}
