import React, { Component } from 'react'


class CurrentlyReading extends Component {

 render() {
   
  const {books} = this.props
   const showingBooks = books.filter((book) => (
     book.shelf === 'currentlyReading'
   ))
	 
	 return (
	 		<div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {showingBooks.map((book) => (
                      <li key={book.id} className='book-currentlyReading'>
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
export default CurrentlyReading