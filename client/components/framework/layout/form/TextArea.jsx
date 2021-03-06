import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { strings } from './strings_lang.js'

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

    this.overrideState = props.override;
    this.editMiddleware = props.onChange || (() => {});
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(e) {
    e.preventDefault();
    const newState = Object.assign({}, this.state);
    newState.value = e.target.value;
    this.editMiddleware(newState.value);
    if (this.override !== true) {
      this.updateState(newState);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.cache = this.state.value;
    if (this.overrideState) {
      this.cache = undefined;
    }
    super.componentWillReceiveProps(nextProps);
  }

  render() {
    const props = {
      name: this.state.label,
      value: this.cache || this.state.value,
      placeholder: this.state.placeholder.capitalize(),
      onChange: this.handleEdit,
    };

    this.cache = null;

    if (this.state.required) {
      props.required = String(strings.required);
    }

    return (
      <div className={this.state.className}>
        {this.props.displayLabel !== false &&
          <p style={{ backgroundColor: 'white' }} className="Inline Padding SoftShadowNonHover Tight Margin Vertical">{(this.props.displayLabel || this.state.label).capitalize()}</p>
        }
        <textarea className="Vertical" {...props} /><br /><br />
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
  displayLabel: '',
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
