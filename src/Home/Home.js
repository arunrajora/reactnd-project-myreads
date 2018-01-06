import React, { Component } from "react";
import { Link } from "react-router-dom";
import { getAll, update } from "../BooksAPI";
import BookShelf from "./BookShelf";

class Shelf {
  constructor(shelfId, shelfName, books) {
    this.shelfName = shelfName;
    this.shelfId = shelfId;
    this.books = books.filter(book => book.shelf === shelfId);
  }
}

class Home extends Component {
  state = {
    books: []
  };

  componentDidMount() {
    getAll().then(books => this.setState({ books }));
  }

  handleBookShelfChange = (book, shelf) => {
    update(book, shelf).then(() => {
      let newBooks = [];
      if (shelf)
        newBooks = this.state.books.map(
          currentBook =>
            book.id === currentBook.id ? { ...currentBook, shelf } : currentBook
        );
      else
        newBooks = this.state.books.filter(
          currentBook => currentBook.id !== book.id
        );
      this.setState({ books: newBooks });
    });
  };

  render() {
    const bookShelves = [
      new Shelf("currentlyReading", "Currently Reading", this.state.books),
      new Shelf("wantToRead", "Want to read", this.state.books),
      new Shelf("read", "Read", this.state.books)
    ];

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {bookShelves.map(({ shelfName, books }) => (
            <BookShelf
              key={shelfName}
              shelfName={shelfName}
              books={books}
              onBookShelfChange={this.handleBookShelfChange}
            />
          ))}
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default Home;
