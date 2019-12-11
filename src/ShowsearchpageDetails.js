import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { throttle } from 'throttle-debounce';
import  { Redirect } from 'react-router-dom'


class ShowsearchpageDetails extends Component {

	constructor(props){
		super(props)
		 this.state = {
			query: '',
			books:props.books,
			// autocompleteSearchThrottled: throttle(1000, this.updateQuery)
		}

	}


updateQuery = (query) => {
	// this.autocompleteSearchThrottled;
    this.setState(() => ({
      query: query
	}))
	if(query!=''){
	BooksAPI.search(query)
      .then((books) => {
		  if(books.length>0){
		this.setState({books})
	  }
	  })}	  
  }


  updateBookShelf = (book,shelf) => {
  BooksAPI.update(book,shelf).then((book) => {
	book.shelf=shelf
	this.setState(state => ({
		books:state.books.filter(bk => bk.id != book.id).concat([ book ])
	}))
  })
  
  }

 render() {
	const {query,books} = this.state
	const {showSearchPage,onBackButtonClick} = this.props
	
	
	// const showingBooks =  query === ''? this.props.books: this.state.books === null ? this.props.books:this.state.books;
	const showingBooks = query === ''? this.props.books: this.state.books
	
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
						
					{showingBooks.map((book) => (
                      <li key={book.id} className='book-list-item'>
                        <div className="book">
                          <div className="book-top">
							<div className="book-cover" style={{ width: 100, height: 160, 
								backgroundImage: `url(${book.imageLinks!=null?book.imageLinks.thumbnail:""})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={this.state.value} onChange={(event) => this.updateBookShelf(book,event.target.value)}> 
                                <option value="move" disabled>Move to...</option>
                                <option value="none"></option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>    
								<option value="currentlyReading">Currently Reading</option>
								<option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title"><p>{book.title}</p></div>
                          <div className="book-authors"><p>{book.authors}</p></div>
                        </div>
                      </li>
					))}
                    </ol>
			
      </div> 
	 )
	 
 }
	
}
export default ShowsearchpageDetails