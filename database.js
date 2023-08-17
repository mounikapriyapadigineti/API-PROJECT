const books = [
  {
    ISBN : "12345BOOK",
    title : "Tesla",
    pubDate : "2023-08-17",
    language : "en",
    numPage : 250 ,
    author : [1,2],
    publications : [1],
    category : ["tech","space","education"]
  }
]

const author = [
  {
    id : 1 ,
    name : "mounika",
    books : ["12345BOOK", "SECRETBOOK"]
  },
  {
    id : 2 ,
    name : "priya",
    books : ["12345BOOK"]
  }
];

const publication = [
  {
    id : 1 ,
    name : "mp",
    books : ["12345BOOK"]
  }
];


module.exports = {books , author , publication};
