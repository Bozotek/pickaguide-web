import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { FileModal } from 'modals/FileModal.jsx';
import { strings } from './EditPicture_lang.js';
import AvatarActions from 'actions/Avatar.js';
import AvatarStore from 'stores/user/Avatar.js';


export class EditPicture extends StoreObserver {

  constructor(props, context) {
    super(props, context, AvatarStore);

    this.ctrl = props.controller;
    this.ctrl.attachSubmit(AvatarActions.update);
  }

  onStore(store) {
    const newState = Object.assign({}, this.state);

    if (store.error) {
      this.ctrl.messageCallback({
        title: String(strings.errorTitle),
        content: String(store.error),
        type: 'Alert',
      });
    } else {
      this.ctrl.toggle(false);
    }

    this.setState(newState);
  }

  render() {
    return (
      <FileModal
        {...this.props}
        layoutStyle="LayoutBlank Tight"
        title={strings.title}
        inputHolder={strings.inputHolder}
        inputLabel="picture"
        sizeWarning={strings.sizeWarning}
      />
    );
  }
}
