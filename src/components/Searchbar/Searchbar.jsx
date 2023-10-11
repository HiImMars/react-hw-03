import { Component } from 'react';

export class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const { searchValue } = this.state;

    if (searchValue.trim() === '') {
      return alert('Please enter something');
    }

    this.props.onSubmit(searchValue);
    this.setState({ searchValue: '' });
  };

  handleInput = e => {
    // const value = e.target.value.toLowerCase();
    const value = e.target.value;

    this.setState({ searchValue: value });
  };

  render() {
    return (
      <header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
          <input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}
