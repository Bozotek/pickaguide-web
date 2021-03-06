import React from 'react';

import { PropsComponent } from 'base/PropsComponent.jsx';

import 'scss/framework/message.scss';


export class Message extends PropsComponent {

  constructor(props, context) {
    super(props, context);

    this.state = props;
    this.onDismiss = props.onDismiss;
    this.timed = props.timed;
    this.messageTimeout = null;
  }

  componentWillUnmount() {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
  }

  componentWillReceiveProps(nextProps) {
    const newState = Object.assign({}, this.state);
    newState.title = nextProps.title;
    newState.content = nextProps.content;
    newState.type = nextProps.type;
    this.updateState(newState);
  }

  dismiss() {
    this.state.onDismiss(this);
  }

  render() {
    let classes = `Message ${this.state.type} ${this.props.messageStyle}`;

    if (this.state.content === '') {
      classes += ' Hidden';
    } else if (this.timed) {
      if (this.messageTimeout) {
        clearTimeout(this.messageTimeout);
      }

      this.messageTimeout = setTimeout(() => {
        this.dismiss();
        this.messageTimeout = null;
      }, 5000);
    }


    return (
      <div className={classes}>
        <div className="MessageTitle" name="MessageTitle">{this.state.title}</div>
        <div className="MessageContent" name="MessageContent">{this.state.content}</div>
      </div>
    );
  }
}

Message.defaultProps = {
  onDismiss: () => {},
  timed: true,
  messageStyle: '',
};

Message.propTypes = {
  title: React.PropTypes.string.isRequired,
  content: React.PropTypes.oneOfType([
    React.PropTypes.string.isRequired,
    React.PropTypes.object.isRequired,
  ]),
  type: React.PropTypes.string.isRequired,
  onDismiss: React.PropTypes.func,
  timed: React.PropTypes.bool,
  messageStyle: React.PropTypes.string,
};
