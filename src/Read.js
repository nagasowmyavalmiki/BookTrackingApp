
import React, { Component } from 'react'


class Read extends Component {

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