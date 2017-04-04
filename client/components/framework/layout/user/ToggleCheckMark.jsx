import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';
import { CheckMark } from 'layout/elements/CheckMark.jsx';

import 'scss/framework/layout/user.scss';

export class ToggleCheckMark extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = {
      active: props.active,
    };

    this.onToggle = props.onToggle;
  }

  render() {
    return (
      <div onClick={this.onToggle} className="ToggleCheckMark">
        <CheckMark active={this.state.active} />
      </div>
    );
  }
}

ToggleCheckMark.propTypes = {
  onToggle: React.PropTypes.func.isRequired,
  active: React.PropTypes.bool.isRequired,
};
