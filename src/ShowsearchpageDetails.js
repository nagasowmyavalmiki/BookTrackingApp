import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import _ from 'lodash'

class ShowsearchpageDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            query: '',
            searchBooks: [],
        }
    }

    updateQuery = (query) => {

        this.setState(() => ({
            query,
            searchBooks: !query ? [] : [this.state.searchBooks]
        }))

        if (query !== '') {
            BooksAPI.search(query)
                .then((searchBooks) => {
                    if (searchBooks.length > 0) {
                        this.setState({ searchBooks })
                    } else {
                        this.setState({ searchBooks: [] })
                    }
                })
        }

    }

    updateBookShelf = (book, shelf) => {
        if (book.shelf === shelf) return;
        this.props.onUpdateBookShelf(book, shelf);
    }

    render() {
        const { query, searchBooks } = this.state
        const { onBackButtonClick } = this.props
        const uniqueBooks = _.uniqBy(searchBooks, 'id')



        return (
            <div className="search-books">

                <div className="search-books-bar">
                    <Link
                        className='close-search'
                        onClick={onBackButtonClick}
                        to='/'>
                    </Link>
                    <input
                        type="search"
                        className="search-books"
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>

                <ol className="books-grid">

                    {uniqueBooks.map((book) => {
                        const myBook = this.props.books.filter((myBook) => (myBook.id === book.id))[0]
                        book.shelf = myBook ? myBook.shelf : "none"
                        console.log(book.id)
                        return (
                            
                            <li key={book.id} className='book-list-item'>
                                <div className="book" >
                                    <div className="book-top">
                                        <div className="book-cover" style={{
                                            width: 100, height: 160,
                                            backgroundImage: `url(${book.imageLinks != null ? book.imageLinks.thumbnail : ""})`
                                        }}></div>
                                        <div className="book-shelf-changer">
                                            <select
                                                value={book.shelf}
                                                onChange={event => this.updateBookShelf(book, event.target.value)}
                                            >
                                                <option value="none" disabled>{book.shelf === 'none' ? 'Add' : 'Move'} to...</option>
                                                {book.shelf === 'none' && <option value="none">&#10004;</option>}
												<option value="currentlyReading">&nbsp;&nbsp;&nbsp;Currently Reading</option>
                                                <option value="wantToRead">&nbsp;&nbsp;&nbsp;Want to Read</option>
                                                <option value="read">&nbsp;&nbsp;&nbsp;Read</option>
                                                
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title"><p>{book.title}</p></div>
                                    <div className="book-authors"><p>{book.authors}</p></div>
                                </div>
                            </li>
                        )
                    })}
                </ol>

            </div>
        )

    }

}
export default ShowsearchpageDetails
