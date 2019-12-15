
import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'


class Read extends Component {


  constructor(props){
		super(props)
		 this.state = {		
			books:props.books
		}

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
    const {books} = this.props
     const showingBooks = books.filter((book) => (
       book.shelf === 'read'
     ))
	 
	 return (
	 <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
					<ol className="books-grid">
                      {showingBooks.map((book)=>(
                      <li key={book.id} className='book-read'>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 100, height: 160, 
                              backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                            <div className="book-shelf-changer">
                              <select value={this.state.value} onChange={(event) => this.updateBookShelf(book,event.target.value)}> 
                                <option value="move" disabled>Move to...</option>
                                <option value="none"></option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>    
								                <option value="currentlyReading">Currently Reading</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors}</div>
                        </div>
                      </li>
                      ))}

                    </ol>
					</div>
		</div>
	 
	 
	 
	 )
 }
	
}
export default Read