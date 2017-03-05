import React from 'react';

import { Input } from 'form/Input.jsx';

import 'scss/framework/form.scss';


export class EmailInput extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = props;
  }

  render() {
    const props = Object.assign({}, this.state);
    props.type = 'email';

    return (
      <Input {...props} />
    );
  }
}
