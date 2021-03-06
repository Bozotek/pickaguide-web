import React from 'react';

import { StoreObserver } from 'base/StoreObserver.jsx';
import { ModalForm } from 'view/ModalForm.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { TextArea } from 'form/TextArea.jsx';
import { NumInput } from 'form/NumInput.jsx';
import { DateTimeInput, nowToInput } from 'form/DateTimeInput.jsx';
import { strings } from './VisitCreation_lang.js';
import VisitsStore from 'stores/user/Visits.js';
import VisitsActions from 'actions/Visits.js';


export class VisitCreation extends StoreObserver {

  constructor(props, context) {
    super(props, context, VisitsStore);

    this.state = { advertId: props.advertId };

    this.ctrl = props.controller;
    this.ctrl.attachSubmit(this.onSubmit.bind(this));
  }

  onStore(store) {
    if (store.error) {
      this.ctrl.messageCallback({
        title: 'Some error occurred when requesting your visit',
        content: String(store.error),
        type: 'Alert',
      }, false);
    } else {
      this.ctrl.closeAndReset();
    }
  }

  componentWillReceiveProps(nextProps) {
    const newState = Object.assign({}, this.state);
    newState.advertId = nextProps.advertId;
    this.setState(newState);
  }

  onSubmit(form) {
    form.advertId = this.state.advertId;
    VisitsActions.visit(form);
  }

  render() {
    return (
      <div>
        <ModalForm controller={this.ctrl} layoutStyle="LayoutBlank Tight" modalStyle="Large">
          <Title>{strings.title}</Title>
          <br />
          <NumInput displayLabel={strings.nbVisitor} label="numberVisitors" min={1} max={100} step={1} placeholder="Visitors" defaultValue={1} required />
          <DateTimeInput displayLabel={strings.when} label="when" min={Date.now()} defaultValue={nowToInput(1000 * 60 * 60 * 5)} required />
          <TextArea displayLabel={false} label="special" placeholder={strings.description} />
        </ModalForm>
      </div>
    );
  }
}

VisitCreation.propTypes = {
  controller: React.PropTypes.object.isRequired,
};
