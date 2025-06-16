const myLibrary = [];

function Book(title, id, author, pages, read){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.title = title;
    this.id = id;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBooktoLibrary(title, author, pages, read){
    const addBook = new Book(title, crypto.randomUUID(), author, pages, read);
    myLibrary.push(addBook);
}

addBooktoLibrary('prueba','ss','qq','qq');

console.log(myLibrary);