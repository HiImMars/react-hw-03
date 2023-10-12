import React, { Component } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import { fetchImages } from '../services/api.js';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isModalOpen: false,
    isLoading: false,
    error: null,
    loadMore: false,
    totalPages: 1,
    activeImage: null,
  };

  async componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      try {
        this.setState({
          isLoading: true,
        });
        const images = await fetchImages(this.state.query, this.state.page);
        this.setState(prevState => {
          return {
            images: prevState.images.concat(images.hits),
          };
        });
      } catch (error) {
        this.setState({ error: error.message });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  ClickHandler = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const search = form.elements.search.value;
    this.setState({ query: search, page: 1, images: [] });
  };

  openModal = selectedImage => {
    this.setState({ activeImage: selectedImage, isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ activeImage: null, isModalOpen: false });
  };

  render() {
    return (
      <div className="wrapper">
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.isLoading && <Loader />}
        {this.state.query && (
          <ImageGallery
            images={this.state.images}
            onImageClick={this.openModal}
          />
        )}
        {this.state.images.length >= 12 && (
          <Button handleClick={this.ClickHandler} />
        )}
        {this.state.isModalOpen && (
          <Modal
            image={this.state.activeImage}
            onCloseModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
