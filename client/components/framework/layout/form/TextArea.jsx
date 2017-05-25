import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import FormActions from 'actions/CurrentForm.js';
import FormStore from 'stores/CurrentForm.js';

import 'scss/framework/form.scss';


export class TextArea extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      label: props.label,
      id: props.id || props.label || 'textarea',
      value: props.value,
      rows: props.rows,
      cols: props.cols,
      placeholder: props.placeholder || props.label,
      required: props.required,
      className: props.className,
    };

    if (this.state.value && this.state.value !== '') {
      FormActions.updateValue({ label: this.state.label, value: this.state.value });
    }

    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    FormActions.updateValue({ label: e.target.name, value: e.target.value });
    const newState = Object.assign({}, this.state);
    newState.value = e.target.value;
    this.updateState(newState);
  }

  render() {
    const props = {
      name: this.state.label,
      value: this.state.value,
      placeholder: this.state.placeholder.capitalize(),
      onChange: this.handleEdit,
    };

    const savedFields = FormStore.getState().fields;

    if (props.value === '' && savedFields[this.state.id]) {
      props.value = savedFields[this.state.id];
    }

    if (this.state.required) {
      props.required = 'required';
    }

    return (
      <div className={this.state.className}>
        <textarea {...props} /><br /><br />
      </div>
    );
  }
}

TextArea.defaultProps = {
  label: 'textarea',
  value: '',
  rows: '10',
  cols: '50',
  required: false,
  className: '',
};

TextArea.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  id: React.PropTypes.string,
  value: React.PropTypes.string,
  rows: React.PropTypes.string,
  cols: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  required: React.PropTypes.bool,
};
