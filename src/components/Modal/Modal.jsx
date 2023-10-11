import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEscape);
  }

  handleEscape = event => {
    if (event.code === 'Escape') this.props.onClose();
  };

  handleBackdrop = event => {
    if (event.target === event.currentTarget) this.props.onClose();
  };

  render() {
    return (
      <div onClick={this.handleBackdrop}>
        <div>{this.props.children}</div>
      </div>
    );
  }
}
