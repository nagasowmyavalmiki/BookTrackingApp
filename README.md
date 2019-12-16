MyReads Project:
A MyReads app that allows user to select and categorize books as you have read, currently reading, 
or want to read. The project emphasizes using React to build the application and provides an API server and client library that you will use to persist information as you interact with the application.

How to Run:
Run npm install to install the project dependencies.
Run the app using npm start.
App can be seen at: localhost:3000.

Backend Server:
To simplify your development process, provided file BooksAPI.js contains the methods you will need to perform necessary operations on the backend.

getAll():
Returns a Promise which resolves to a JSON object containing a collection of book objects.
This collection represents the books currently in the bookshelves in your app.

update(book, shelf):
book: <Object>containing at minimum an id attribute
shelf: <String> contains one of ["wantToRead", "currentlyReading", "read"]
Returns a Promise which resolves to a JSON object containing the response data of the POST request

search(query, maxResults):
query: <String> will put input value in search bar
maxResults: <Integer> Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
Returns a Promise which resolves to a JSON object containing a collection of book objects.
These books do not know which shelf they are on. They are raw results only. 
You'll need to make sure that books have the correct state while on the search page.

How to Use the App:
Books are arranged in three categories, Currently Reading, Want to Read and Read
To change a book's category or remove a book from the list, click on the green button on the book cover
To add new books, click on the green + button at the bottom of the page. Enter an author's name or title. Up to 20 items will be returned.

