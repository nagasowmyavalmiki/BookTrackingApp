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
			searchBooks:props.books,
			// autocompleteSearchThrottled: throttle(1000, this.updateQuery)
		}

	}


updateQuery = (query) => {
	// this.autocompleteSearchThrottled;
    this.setState(() => ({
      query: query
	}))
	if(query===''){
		this.setState({searchBooks:[]})
	}
	if(query!==''){
	BooksAPI.search(query)
      .then((searchBooks) => {
		if(searchBooks.length>0){
		this.setState({searchBooks})
	  }
	  else{
		this.setState({searchBooks:[]})
	  }
	  })}
	  	  
  }


  updateBookShelf = (book,shelf) => {
  BooksAPI.update(book,shelf).then((book) => {
	book.shelf=shelf
	this.setState(state => ({
		searchBooks:state.searchBooks.filter(bk => bk.id !== book.id).concat([ book ])
	}))
  })
  
  }

 render() {
	const {query,searchBooks} = this.state
	const {showSearchPage,onBackButtonClick} = this.props
	
	
	// const showingBooks =  query === ''? this.props.books: this.state.books === null ? this.props.books:this.state.books;
	

	const booksFromHome = this.props.books
	const booksFromSearch = this.state.searchBooks

	booksFromSearch.map(book => {
		booksFromHome.forEach(homeBook => {
		  if (book.id === homeBook.id) {
			book.shelf=homeBook.shelf ? homeBook.shelf:"none"
		  }
		  else{
			book.shelf='none'
		  }
		})
	  })
	  const showingBooks = query === ''? this.state.searchBooks=[]: booksFromSearch
	 
	
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
							<select
									value={book.shelf}
									onChange={event => this.updateBookShelf(book, event.target.value)}
								>
									<option value="none" disabled>{book.shelf === 'none' ? 'Add' : 'Move'} to...</option>
									<option value="currentlyReading">Currently Reading</option>
									<option value="wantToRead">Want to Read</option>
									<option value="read">Read</option>
									{book.shelf !== 'none' && <option value="none">None</option>}
								</select>



                              {/* <select value={book.shelf} onChange={(event) => this.updateBookShelf(book,event.target.value)}> 	
								<option value="move" disabled>Move to...</option>
                                {book.shelf!='none'?(<option value="none" ></option>):
								(<option value="none" >&#10004;</option>)}
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>    
								<option value="currentlyReading">Currently Reading</option>
                              </select> */}
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