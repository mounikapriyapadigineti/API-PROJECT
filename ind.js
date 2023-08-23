require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//database
const database = require("./database/database");

//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicatitonModel = require("./database/publication");

//initialize express
const booky = express();
booky.use(bodyParser.urlencoded({extended : true}));
booky.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL,
{

}).then(()=> console.log("connection established"));


/*
Route
description  get all books
access      public
parameter   none
methods     get

*/
booky.get("/",async (req,res) =>{
   const getAllBooks = await BookModel.find();
   return res.json(getAllBooks);
});

/*
Route        /is/
description  get specific book on ISBN
access      public
parameter   isbn
methods     get

*/
booky.get("/is/:isbn",(req,res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );
  if(getSpecificBook.length === 0){
    return res.json({error : `No book found for the ISBN of ${req.params.isbn}`})
  }
    return res.json({book : getSpecificBook});
});

/*
Route        /c/
description  get specific book on category
access      public
parameter   category
methods     get

*/

booky.get("/c/:category",(req,res)=>{
  const getSpecificBook = database.books.filter(
    (book) => book.category.includes(req.params.category)
  );
  if(getSpecificBook.length ===0){
    return res.json({error : `No book found for the category of ${req.params.category}`})
  }
  return res.json({book : getSpecificBook});
})

/*
Route          /l/
description  get specific book on language
access      public
parameter   language
methods     get

*/

booky.get("/l/:language",(req,res)=>{
  const getSpecificBook = database.books.filter(
    (book) => book.language.includes(req.params.language)
  );
  if(getSpecificBook.length ===0){
    return res.json({error : `No book found for the category of ${req.params.language}`})
  }
  return res.json({book : getSpecificBook});
})

/*
Route        /author
description  get all authors
access      public
parameter   none
methods     get

*/
booky.get("/author",async (req,res) =>{
   const getAllAuthors = await AuthorModel.find();
   return res.json(getAllAuthors);
});

/*
Route        /author
description  get specific book on language
access      public
parameter   author
methods     get

*/

booky.get("/author/:name",(req,res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.name === req.params.name
  );
  if(getSpecificAuthor.length === 0){
    return res.json({error : `No book found for the author of ${req.params.name}`})
  }
    return res.json({book : getSpecificAuthor});
});


/*
Route        /author/book/
description  get list of authors based on books
access      public
parameter   isbn
methods     get

*/
booky.get("/author/book/:isbn",(req,res) => {
  const getSpecificAuthor = database.author.filter(
    (author) => author.books.includes(req.params.isbn)
  );
  if(getSpecificAuthor.length === 0){
    return res.json({error : `No book found for the book of ${req.params.isbn}`})
  }
    return res.json({book : getSpecificAuthor});
});



/*
Route        /publications
description  get all publications
access      public
parameter   none
methods     get

*/
booky.get("/publications", async (req,res) =>{
   const getAllPublications = await PublicationModel.find();
   return res.json(getAllPublications);
});




/*
Route        /publications/name
description  get specific publication
access      public
parameter   name
methods     get

*/

booky.get("/publications/:name",(req,res) => {
  const getSpecificpublication = database.publication.filter(
    (publication) => publication.name === req.params.name
  );
  if(getSpecificpublication.length === 0){
    return res.json({error : `No book found for the publication of ${req.params.name}`})
  }
    return res.json({book : getSpecificpublication});
});


/*
Route        /publications/book/
description  get list of authors based on publications
access      public
parameter   book isbn
methods     get

*/
booky.get("/publications/book/:isbn",(req,res) => {
  const getSpecificpublication = database.publication.filter(
    (publication) => publication.books.includes(req.params.isbn)
  );
  if(getSpecificpublication.length === 0){
    return res.json({error : `No book found for the book of ${req.params.isbn}`})
  }
    return res.json({book : getSpecificpublication});
});



//POST REQUEST

// ADD NEW BOOK
//ADD NEW AUTHOR
//ADD NEW publication

/*
Route        /books/new/
description  post new book
access      public
parameter   none
methods     post

*/
booky.post("/book/new",(req,res)=>{
  const newBook = req.body;
  database.books.push(newBook);
  return res.json({updatedBooks : database.books});
});


/*
Route        /author/new/
description  post new author
access      public
parameter   none
methods     post

*/

booky.post("/author/new",(req,res) =>{
  const newAuthor = req.body;
  database.author.push(newBook);
  return res.json({updatedAuthor: database.author});
});


/*
Route        /publication/new/
description  post new publication
access      public
parameter   none
methods     post

*/

booky.post("/publications/new",(req,res) =>{
  const newPublication = req.body;
  database.publication.push(newBook);
  return res.json({updatedPublication: database.publication});
});

/*
Route        /publication/update/book
description  update-- add new publication
access      public
parameter   none
methods     put

*/

booky.put("/publication/update/book/:isbn",(req,res)=>{
  //update the publication database
  database.publication.forEach((pub) => {
    if(pub.id === req.body.pubId){
      return pub.books.push(req.params.isbn);
    }
  });
  //update the book database
  database.books.forEach((book)=>{
    if(book.ISBN === req.params.isbn){
      book.publications = req.body.pubId;
      return;
    }
  });
  return res.json(
    {
      books:database.books,
      publications : database.publication,
      message : "Successfully updated publications"
    }
  );
});


/****DELETE*****/
/*
Route        /book/delete/
description  delete a book
access      public
parameter   isbn
methods     delete
*/

booky.delete("/book/delete/:isbn",(req,res)=>{
  //whichever book that doesnt match with the isbn , just send it to an updatedBookDatabaseArray
  //and rest will be filtered
  const updatedBookDatabase = database.books.filter(
    (book)=> book.ISBN !== req.params.isbn
  )
  database.books = updatedBookDatabase;
  return res.json({books : database.books});
});



/*
Route        /author/delete/
description  delete a author
access      public
parameter   name
methods     delete
*/

booky.delete("/author/delete/:name",(req,res)=>{
  //whichever book that doesnt match with the isbn , just send it to an updatedBookDatabaseArray
  //and rest will be filtered
  const updatedAuthorDatabase = database.author.filter(
    (author)=> author.name !== req.params.name
  )
  database.author = updatedAuthorDatabase;
  return res.json({author : database.author});
});



/*
Route        /book/delete/author
description  delete an author from a book and vice versa
access      public
parameter   isbn , authorId
methods     delete
*/
booky.delete("/book/delete/author/:isbn/:authorId", (req,res)=>{
  //update the book database
  database.books.forEach((book)=>{
    if(book.ISBN === req.params.isbn){
      const newAuthorList = book.author.filter (
        (eachAuthor) => eachAuthor !== parseInt (req.params.authorId)
      );
      book.author = newAuthorList;
      return;
    }
  })

  //update the author database
  database.author.forEach((eachAuthor)=>{
    if(eachAuthor.id === parseInt(req.params.authorId)){
      const newBookList = eachAuthor.books.filter(
        (book) => book !== req.params.isbn
      );
      eachAuthor.books = newBookList;
      return;
    }
  });

  return res.json({
    book : database.books,
    author : database.author,
    message: "author was deleted"
  });
});







booky.listen(3000 ,() =>{
  console.log("server  is up and running");
})
