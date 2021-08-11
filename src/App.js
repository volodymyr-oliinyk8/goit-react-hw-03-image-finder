import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import apiService from './components/api/apiService';
import './App.css';

import Searchbar from './components/Searchbar/Searcbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Modal from './components/Modal/Modal';

class App extends Component {
  state = {
    search: '',
    images: [],
    currentPage: 1,
    error: null,
    isLoading: false,
    nothingMessege: false,
    largeImage: '',
    showModal: false,
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.search !== this.state.search ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.setState({ isLoading: true });

      apiService
        .featchImage(this.state.search, this.state.currentPage)
        .then(images => {
          if (images.length === 0) {
            this.setState({ nothingMessege: true });
          }
          this.setState(prevState => ({
            images: [...prevState.images, ...images],
          }));
          this.handleScroll();
        })
        .catch(error => this.setState({ error }))
        .finally(() => this.setState({ isLoading: false }));
    }
  }
  hamdelSearchSubmit = search => {
    this.setState({ search, currentPage: 1, images: [] });
  };
  handleMoreImages = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };
  handleScroll() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }
  onClickImage = (largeImage, tags) => {
    this.setState({
      largeImage: largeImage,
      showModal: true,
      tags: tags,
    });
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  handleImageClick = ({ target }) => {
    if (target.nodeName !== 'IMG') {
      return;
    }
    const { url } = target.dataset;
    const tag = target.alt;
    this.setState({
      url,
      tag,
      loader: true,
    });
    this.toggleModal();
  };
  render() {
    return (
      <>
        <Searchbar onSubmit={this.hamdelSearchSubmit} />
        {this.state.nothingMessege && (
          <p>
            Nothing was found for this query... specify the request, please.
          </p>
        )}
        {this.state.error && <p>Ooops... Something went wrong! Try again.</p>}
        {this.state.images.length > 0 && (
          <>
            <ImageGallery
              images={this.state.images}
              onClickImage={this.onClickImage}
            />

            <Button onClick={this.handleMoreImages} />
          </>
        )}
        {this.state.isLoading && (
          <Loader
            type="Oval"
            color="#00BFFF"
            height={80}
            width={80}
            timeout={3000}
          />
        )}
        {this.state.showModal && (
          <Modal onClose={this.toggleModal} onClick={this.handleImageClick}>
            <img src={this.state.largeImage} alt={this.state.tags} />
          </Modal>
        )}
      </>
    );
  }
}

export default App;
