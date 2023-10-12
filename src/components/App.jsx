import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { fetchAllImagesByQuery, fetchImages } from '../services/api.js';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isModalOpen: false,
    isLoading: false,
    error: null,
    loadMore: true,
    totalPages: 1,
    activeImage: null,
  };

  fetchAllImages = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const images = await fetchImages(this.state.query, this.state.page);
      this.setState(prevState => {
        return {
          images: prevState.images.concat(images.hits),
          loadMore: this.state.page < this.state.totalPages,
        };
      });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  totalPageCount = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const images = await fetchAllImagesByQuery(this.state.query);
      this.setState({ totalPages: Math.ceil(images.totalHits / 12) });
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

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
    console.log(search);
    this.setState({ query: search, page: 1, images: [] });
    this.totalPageCount();
  };

  openModal = selectedImage => {
    this.setState({ activeImage: selectedImage, isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ activeImage: null, isModalOpen: false });
  };

  componentDidMount = () => {
    this.state.query ?? this.fetchAllImages();
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      this.fetchAllImages();
    }
  }

  handleImageClick = image => {
    this.setState({ activeImage: image, showModal: true });
    document.body.style.overflow = 'hidden';
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {this.state.isLoading && <Loader />}
        {this.state.query && (
          <>
            <ImageGallery
              images={this.state.images}
              onImageClick={this.openModal}
            />
            {this.state.loadMore ? (
              <Button handleClick={this.ClickHandler} />
            ) : (
              <></>
            )}
          </>
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
