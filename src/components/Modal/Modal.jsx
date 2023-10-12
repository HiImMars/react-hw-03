// export const Modal = () => {
//   return <div> Modal</div>;
// };
import css from './Modal.module.css';
import React, { Component } from 'react';
// import { Overlay, ModalDiv } from './styledComponents/Modal';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.onCloseModal();
    }
  };

  handleClick = event => {
    if (event.target === event.currentTarget) {
      this.props.onCloseModal();
    }
  };

  render() {
    const { image } = this.props;

    return (
      <div className={css.overlay} onClick={this.handleClick}>
        <div className={css.modal}>
          <img src={image.largeImageURL} alt={image.tags} />
        </div>
      </div>
    );
  }
}
