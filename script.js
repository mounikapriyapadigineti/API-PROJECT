const express = require("express");
//database
const database = require("./database");

//initialize express
const booky = express();
/*
Route
description  get all books
access      public
parameter   none
methods     get

*/
booky.get("/",(req,res) =>{
  return res.json({books: database.books});
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
booky.get("/author",(req,res)=>{

  return res.json({authors : database.author});
})

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

booky.get("/publications",(req,res) => {
  return res.json({publications : database.publication});
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







booky.listen(3000 ,() =>{
  console.log("server  is up and running");
})
