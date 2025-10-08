const myLibrary = [];

//Refactored book class
/* function Book(title, author, pages){
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = false;
} */

class Book{
    constructor(title, author, pages){
        if (!new.target) {
            throw Error("You must use the 'new' operator to call the constructor");
        }
        this.id = crypto.randomUUID();
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = false;
    }
}

//Function to add information to the object book
function addBooktoLibrary(title, author, pages){
    const addBook = new Book(title, author, pages);
    myLibrary.push(addBook);
} 

//Function to change read status
Book.prototype.readStatus = function (){
    if(this.read === false){
        this.read = true;
    } else {
        this.read = false;
    }
};

//Variables to select all the components that are needed
const container = document.querySelector('.container');
const content = document.querySelector('.container-content');
const contentText = document.querySelector('.content-text');
const form = document.getElementById('main-form');
const dialog = document.querySelector('dialog');
const btn = document.querySelector('.btn-book');
const btnSubmit = document.querySelector('.btn-submit');
const btnCancel = document.querySelector('.btn-cancel');
const titleInput = document.getElementById('title');
const authorInput = document.getElementById('author');
const pagesInput = document.getElementById('pages');

contentText.style.fontStyle = "italic";

//Function to open the dialog and enter the book information
btn.addEventListener('click', () => {
    dialog.showModal();
});

//Function to close the dialog and reset inputs
btnCancel.addEventListener('click', () => {
    dialog.close();
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
});

console.log(form);

//Validate that all input are not empty and show custom message
form.addEventListener("submit", (event) => {
    event.preventDefault();
    // if the input field is invalid
    if (titleInput.validity.valueMissing) {
      // display an appropriate error message
      titleInput.setCustomValidity("Please fill the title!");
      titleInput.reportValidity();
      // prevent form submission
      return;
    } else {
        titleInput.setCustomValidity("");
    }

    if (authorInput.validity.valueMissing) {
        // display an appropriate error message
        authorInput.setCustomValidity("Please fill the author!!");
        authorInput.reportValidity();
        event.preventDefault();
        return;
      } else {
        authorInput.setCustomValidity("");
    }

    if (pagesInput.validity.valueMissing) {
        // display an appropriate error message
        pagesInput.setCustomValidity("Please fill the number of pages!!");
        pagesInput.reportValidity();
        return;
      } else {
        pagesInput.setCustomValidity("");
    }

    //Clean display to add books
    if(myLibrary.length === 0){
        content.innerText = "";
    }

    //Display the books
    addBooktoLibrary(titleInput.value, authorInput.value, pagesInput.value);
    const newDiv = document.createElement('div');
    newDiv.className = 'book';
    for (let i = 0; i < myLibrary.length; i++) {
        newDiv.dataset.id = myLibrary[i].id;
        newDiv.innerText = "Title: " + myLibrary[i].title + "\n Author: " + myLibrary[i].author + "\n Pages: " + myLibrary[i].pages + "\n Have you read it?" + "\n";
    }
    content.appendChild(newDiv);
    const btnStatus = document.createElement('button');
    btnStatus.className = 'btn-status';
    btnStatus.innerText = "Not read";

    //Change button display based on read value
    btnStatus.addEventListener('click', () => {
        for (let i = 0; i < myLibrary.length; i++) {
            myLibrary[i].readStatus();
            if(myLibrary[i].read === true){
                btnStatus.innerText = "Read";
                btnStatus.style.backgroundColor = "green";
            } else {
                btnStatus.innerText = "Not read";
                btnStatus.style.backgroundColor = "red";
            }
        }
    });
    newDiv.appendChild(btnStatus);
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";

    //delete button functionality
    const deleteButton = document.createElement('button');
    deleteButton.className = "delete-book";

    //search id and then index to properly delete book
    deleteButton.addEventListener('click', () => {
        let index = myLibrary.map (element => {
            return element.id;
        }).indexOf(newDiv.dataset.id);
        myLibrary.splice(index, 1);
        if(newDiv){
            newDiv.remove();
        }
        if(myLibrary.length === 0){
            content.appendChild(contentText);
        }
    });
    newDiv.appendChild(deleteButton);
    dialog.close();
});