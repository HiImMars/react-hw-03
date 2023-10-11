import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { getGalleryItems } from './api/api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    hits: null,
    isLoader: false,
    isLoadBtn: false,
    showModal: false,
    modalImage: '',
    tags: '',
  };

  componentDidUpdate(_, prevState) {
    const { searchValue, page } = this.state;

    if (searchValue !== prevState.searchValue || page !== prevState.page) {
      this.setState({ isLoader: true });

      getGalleryItems(searchValue, page)
        .then(data => {
          if (!data.totalHits) {
            alert(`"${searchValue}" not found. Please enter something else.`);
            return;
          }

          const lastPage = Math.ceil(data.totalHits / 12);

          if (page === lastPage) {
            this.setState({ isLoadBtn: true });
            alert('Thats all images');
          }

          this.setState(prev => ({ hits: [...prev.hits, ...data.hits] }));
        })
        .catch(error => {
          console.log(error);
          return alert('Something went wrong. Please try again later.');
        })
        .finally(() => {
          this.setState({ isLoader: false });
        });
    }
  }

  handleSubmit = searchValue => {
    this.setState({ searchValue, page: 1, hits: [], isLoadBtn: false });
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  toggleModal = () => {
    this.setState(prev => ({ showModal: !prev.showModal }));
  };

  handleImageClick = (largeImageURL, tags) => {
    this.setState({ modalImage: largeImageURL, tags });
    this.toggleModal();
  };

  render() {
    const { hits, isLoader, isLoadBtn, showModal, modalImage, tags } =
      this.state;
    const showLoadBtn = hits && hits.length > 0 && !isLoadBtn;
    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />

        {isLoader && <Loader />}

        {hits && (
          <ImageGallery>
            <ImageGalleryItem
              images={hits}
              onImageClick={this.handleImageClick}
            />
          </ImageGallery>
        )}

        {showLoadBtn && <Button onBtnClick={() => this.handleLoadMore()} />}

        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={modalImage} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
