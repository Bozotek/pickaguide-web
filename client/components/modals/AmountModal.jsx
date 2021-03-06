import React from 'react';

import { ModalForm } from 'view/ModalForm.jsx';
import { Title } from 'layout/elements/Title.jsx';
import { NumInput } from 'form/NumInput.jsx';
import { strings } from './AmountModal_lang.js';


export class AmountModal extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.ctrl = props.controller;
    this.ctrl.attachSubmit(props.onConfirm);
  }

  render() {
    return (
      <div>
        <ModalForm controller={this.ctrl} layoutStyle="LayoutBlank" modalStyle="Medium">
          <Title>{strings.title}</Title>
          <br />
          <NumInput label="amount" displayLabel={strings.amount} min={1} max={200} step={0.5} placeholder={strings.amount} required />
        </ModalForm>
      </div>
    );
  }
}

AmountModal.propTypes = {
  controller: React.PropTypes.object.isRequired,
  onConfirm: React.PropTypes.func.isRequired,
};
