//** Local storage is only for book info in grid & general info; sorting and dark mode not stored 

// finished 12/29/30

let myLibrary = undefined;
let i = undefined;
let generalInfo = undefined;
let copyLibrary = "";

// if local storage exists, load it
if(localStorage.length == 0 || localStorage.getItem("library") == "[]" && localStorage.getItem("generalInfo") == '{"bookNum":"0","completedBooks":"0","generalPagesRead":"0","generalTotalPages":"0","bookCompletionRate":"0","pagesCompletionRate":"0"}'){
    i = 0;
    myLibrary = [];
}
else{
    myLibrary = JSON.parse(localStorage.getItem("library"));
    i = myLibrary[myLibrary.length - 1].id + 1;
    generalInfo = JSON.parse(localStorage.getItem("generalInfo"));
}

//book constructor
function Book(id, title, author, publication, totalPages, pagesRead, read){
    this.id = id,
    this.title = title,
    this.author = author,
    this.publication = publication,
    this.totalPages = totalPages,
    this.pagesRead = pagesRead,
    this.read = read
}

// add general info
let generalBook = document.getElementById("books-value");
let generalCompletedBooks = document.getElementById("completed-books-value");
let generalPagesRead = document.getElementById("pages-read-value");
let generalTotalPages = document.getElementById("total-pages-value");
let generalCompletionRateBooks = document.getElementById("completion-rate-value-books");
let generalCompletionRatePages = document.getElementById("completion-rate-value-pages");

// (individual) book info
let bookInfoTitle = "";
let bookInfoAuthor = "";
let bookInfoPublished = "";
let bookInfoPages = "";
let bookToggleCheckbox = "";

function getGeneralInfo(){
    generalBook = document.getElementById("books-value");
    generalCompletedBooks = document.getElementById("completed-books-value");
    generalPagesRead = document.getElementById("pages-read-value");
    generalTotalPages = document.getElementById("total-pages-value");
    generalCompletionRateBooks = document.getElementById("completion-rate-value-books");
    generalCompletionRatePages = document.getElementById("completion-rate-value-pages");
}

// general info constructor
function GeneralInfo(bookNum, completedBooks, generalPagesRead, generalTotalPages, bookCompletionRate, pagesCompletionRate){
    this.bookNum = bookNum,
    this.completedBooks = completedBooks,
    this.generalPagesRead = generalPagesRead,
    this.generalTotalPages = generalTotalPages,
    this.bookCompletionRate = bookCompletionRate,
    this.pagesCompletionRate = pagesCompletionRate
}

function addGeneralInfo(){
    // general info
    getGeneralInfo();

    //add 1 book
    generalBook.textContent = lengthGreaterThan10(+generalBook.textContent + 1);

    //add to completed if "read" option chosen
    if(readUnread.value === "read"){
        generalCompletedBooks.textContent = lengthGreaterThan10(+generalCompletedBooks.textContent + 1);
    }

    // pages read
    generalPagesRead.textContent = lengthGreaterThan10(+generalPagesRead.textContent + +pagesRead.value);

    // total pages
    generalTotalPages.textContent = lengthGreaterThan10(+generalTotalPages.textContent + +totalPages.value);

    // completion rate
    generalCompletionRateBooks.textContent = Number.parseFloat((+generalCompletedBooks.textContent)/(+generalBook.textContent) * 100).toFixed(2);
    generalCompletionRatePages.textContent = Number.parseFloat((+generalPagesRead.textContent)/(+generalTotalPages.textContent) * 100).toFixed(2);

    // store in local storage
    generalInfo = new GeneralInfo(generalBook.textContent, generalCompletedBooks.textContent, generalPagesRead.textContent, generalTotalPages.textContent, generalCompletionRateBooks.textContent, generalCompletionRatePages.textContent);
    localStorage.setItem("generalInfo", JSON.stringify(generalInfo));
}

//check length of general info values
function lengthGreaterThan10(num){
    if(num.toString().length > 10){
        return num.toExponential();
    }
    return num;
}

//book modal
let bookModal = document.getElementById("book-modal");
let bookTitle = document.getElementById("book-title");
let bookAuthor = document.getElementById("book-author");
let publishedDate = document.getElementById("published-date");
let totalPages = document.getElementById("total-pages");
let pagesRead = document.getElementById("pages-read");
let readUnread = document.getElementById("read-unread");
let cancelBtn = document.getElementById("cancel-btn");
let addBtn = document.getElementById("add-btn");

// mobile add button
let overlay = document.getElementById("modal-overlay");
let mobileAddBtn = document.getElementById("mobile-add-button");
mobileAddBtn.addEventListener("click", () =>{
    bookModal.classList.add("active");
    overlay.classList.add("active");
});

// book grid add btn
let bookGridAddBtn = document.getElementById("grid-add-btn");
bookGridAddBtn.addEventListener("click", () =>{
    overlay.classList.add("active");
    bookModal.classList.add("active");
});

// NEW modal close btn
let newModalCloseBtn = document.getElementById("modal-close-btn");
newModalCloseBtn.addEventListener("click", () =>{
    bookModal.classList.remove("active");
    overlay.classList.remove("active");
});

// EDIT modal
let editBookModal = document.getElementById("edit-book-modal");
let editBookTitle = document.getElementById("edit-book-title");
let editBookAuthor = document.getElementById("edit-book-author");
let editPublishedDate = document.getElementById("edit-published-date");
let editTotalPages = document.getElementById("edit-total-pages");
let editPagesRead = document.getElementById("edit-pages-read");
let editReadUnread = document.getElementById("edit-read-unread");
let editCancelBtn = document.getElementById("edit-cancel-btn");
let editBtn = document.getElementById("edit-btn");

// dark mode
let darkMode = document.getElementById("dark-mode-checkbox");
darkMode.addEventListener("change", () =>{
    document.body.classList.toggle("toggle-dark-mode");
    bookModal.classList.toggle("toggle-modal");
    bookModal.classList.toggle("white-background");
    editBookModal.classList.toggle("toggle-modal");
    editBookModal.classList.toggle("white-background");
});

// EDIT modal close btn
let editModalCloseBtn = document.getElementById("edit-modal-close-btn");
editModalCloseBtn.addEventListener("click", () =>{
    editBookModal.classList.remove("active");
    overlay.classList.remove("active");
});

// EDIT cancel btn
editCancelBtn.addEventListener("click", () =>{
    editBookModal.classList.remove("active");
    overlay.classList.remove("active");

    editBookTitleWarning.textContent = "";
    editBookTitle.style.borderColor = "black";

    editBookAuthorWarning.textContent = "";
    editBookAuthor.style.borderColor = "black";

    editPublishedDateWarning.textContent = "";
    editPublishedDate.style.borderColor = "black";

    editTotalPagesWarning.textContent = "";
    editTotalPages.style.borderColor = "black";

    editPagesReadWarning.textContent = "";
    editPagesRead.style.borderColor = "black";

});

//modal overlay
overlay.addEventListener("click", () =>{
    bookModal.classList.remove("active");
    editBookModal.classList.remove("active");
    overlay.classList.remove("active");
});


// clear input values from modal
function clearModalValues(){
    bookTitle.value = "";
    bookAuthor.value = "";
    publishedDate.value = "";
    totalPages.value = "";
    pagesRead.value = "";
    readUnread.selectedIndex = 0;
}

// warnings
let bookTitleWarning = document.getElementById("book-title-warning");
let bookAuthorWarning = document.getElementById("book-author-warning");
let publishedDateWarning = document.getElementById("published-date-warning");
let totalPagesWarning = document.getElementById("total-pages-warning");
let pagesReadWarning = document.getElementById("pages-read-warning");

// book grid
let bookGrid = document.getElementById("book-grid");

    //cancel btn
cancelBtn.addEventListener("click", () =>{
    clearModalValues(); 
    bookModal.classList.remove("active");
    overlay.classList.remove("active");

    bookTitleWarning.textContent = "";
    bookTitle.style.borderColor = "black";

    bookAuthorWarning.textContent = "";
    bookAuthor.style.borderColor = "black";

    bookAuthorWarning.textContent = "";
    bookAuthor.style.borderColor = "black";

    publishedDateWarning.textContent = "";
    publishedDate.style.borderColor = "black";

    totalPagesWarning.textContent = "";
    totalPages.style.borderColor = "black";

    pagesReadWarning.textContent = "";
    pagesRead.style.borderColor = "black";

});

function totalPagesWarningCode(){
    if(Number.isInteger(+totalPages.value) && +totalPages.value > 0 && +totalPages.value <= 9999999999){
        totalPagesWarning.textContent = "";
        totalPages.style.borderColor = "black";
    }
    else if(Number.isInteger(+totalPages.value) && +totalPages.value > 9999999999){
        totalPagesWarning.textContent = "Please enter a number less than 9,999,999,999 (10-digit max)";
        totalPages.style.borderColor = "red";
    }
    else if(Number.isInteger(+totalPages.value) && +totalPages.value <= 0){
        totalPagesWarning.textContent = "Please enter a number bigger than 0.";
        totalPages.style.borderColor = "red";
    }
    else{
        totalPagesWarning.textContent = "Please enter a valid number.";
        totalPages.style.borderColor = "red";
    }
}

function PagesReadWarningCode(){
    if(!Number.isInteger(+pagesRead.value)){
        pagesReadWarning.textContent = "Please enter a valid number.";
        pagesRead.style.borderColor = "red";
    }
    else if(Number.isInteger(+pagesRead.value) && +pagesRead.value > +totalPages.value){
        pagesReadWarning.textContent = "Please enter a number less than or equal to total pages.";
        pagesRead.style.borderColor = "red";
    }
    else if(Number.isInteger(+pagesRead.value) && +pagesRead.value < 0){
        pagesReadWarning.textContent = "Please enter a non-negative number."
        pagesRead.style.borderColor = "red";
    }
    else{
        pagesReadWarning.textContent = "";
        pagesRead.style.borderColor = "black";
    }
}

function removeBookInfo(bookInfo){
    // remove data from general info
    bookInfoPages = bookInfo.querySelector(".book-pages");
    let editedBookPages = bookInfoPages.textContent.replace("Pages: ", "");
    let pagesReadSplit = editedBookPages.split(" / ")[0];
    let totalPagesSplit = editedBookPages.split(" / ")[1];
    bookToggleCheckbox = bookInfo.querySelector(".read-toggle-checkbox");
    getGeneralInfo();

        // subtract 1 book from books if greater than 0
    if(+generalBook.textContent > 0){
        generalBook.textContent = lengthGreaterThan10(+generalBook.textContent - 1);
    }

        // if book == "read", subtract 1 from completed
    if(bookToggleCheckbox.checked && +generalCompletedBooks.textContent > 0){
        generalCompletedBooks.textContent = lengthGreaterThan10(+generalCompletedBooks.textContent - 1);
    }

        // subtract pages read
    if(+generalPagesRead.textContent > 0){
        generalPagesRead.textContent = lengthGreaterThan10(+generalPagesRead.textContent - +pagesReadSplit);
    }

        // subtract total pages
    if(+generalTotalPages.textContent > 0){
        generalTotalPages.textContent = lengthGreaterThan10(+generalTotalPages.textContent - +totalPagesSplit);
    }

        // update subtracted completion rates
    if(+generalCompletedBooks.textContent == 0 || +generalBook.textContent == 0){
        generalCompletionRateBooks.textContent = 0;
    }
    else{
        generalCompletionRateBooks.textContent = Number.parseFloat((+generalCompletedBooks.textContent)/(+generalBook.textContent) * 100).toFixed(2);
    }
    if(+generalPagesRead.textContent == 0 || +generalTotalPages.textContent == 0){
        generalCompletionRatePages.textContent = 0;
    }
    else{
        generalCompletionRatePages.textContent = Number.parseFloat((+generalPagesRead.textContent)/(+generalTotalPages.textContent) * 100).toFixed(2);
    }

    // update general info localstorage
    generalInfo.bookNum = generalBook.textContent;
    generalInfo.completedBooks = generalCompletedBooks.textContent;
    generalInfo.generalPagesRead = generalPagesRead.textContent;
    generalInfo.generalTotalPages = generalTotalPages.textContent;
    generalInfo.bookCompletionRate = generalCompletionRateBooks.textContent;
    generalInfo.pagesCompletionRate = generalCompletionRatePages.textContent;
    localStorage.setItem("generalInfo", JSON.stringify(generalInfo));


    // remove specific element from myLibrary
    myLibrary.forEach((book, index) =>{
        if(book.id == bookInfo.id){
            myLibrary.splice(index, 1);
            return;
        }
    });

    // if myLibrary is empty, reset i to 0
    if(myLibrary.length == 0){
        i = 0;
    }

    // update local storage
    localStorage.setItem("library", JSON.stringify(myLibrary));

    bookInfo.remove();
}

// sorting options
let sortingOptions = document.getElementById("sorting-options");
let sortingDirections = document.getElementById("sorting-direction");
let optionUnread = document.getElementById("unread-btn");
let optionRead = document.getElementById("read-btn");

//add btn
addBtn.addEventListener("click", () =>{
    bookModal = document.getElementById("book-modal");
    bookTitle = document.getElementById("book-title");
    bookAuthor = document.getElementById("book-author");
    publishedDate = document.getElementById("published-date");
    totalPages = document.getElementById("total-pages");
    pagesRead = document.getElementById("pages-read");
    readUnread = document.getElementById("read-unread");

    bookTitleWarning = document.getElementById("book-title-warning");
    bookAuthorWarning = document.getElementById("book-author-warning");
    publishedDateWarning = document.getElementById("published-date-warning");
    totalPagesWarning = document.getElementById("total-pages-warning");
    pagesReadWarning = document.getElementById("pages-read-warning");

    // when one of the input is empty, give warning
    if(bookTitle.value === "" || bookAuthor.value === "" || publishedDate.value === "" || totalPages.value === "" || pagesRead.value === ""){
        if(bookTitle.value === "" && bookTitleWarning.textContent === ""){
            bookTitleWarning.textContent = "Please enter a book title.";
            bookTitle.style.borderColor = "red";
        }
        if(bookTitle.value !== ""){
            bookTitleWarning.textContent = "";
            bookTitle.style.borderColor = "black";
        }

        if(bookAuthor.value === "" && bookAuthorWarning.textContent === ""){
            bookAuthorWarning.textContent = "Please enter a book author.";
            bookAuthor.style.borderColor = "red";
        }
        if(bookAuthor.value !== ""){
            bookAuthorWarning.textContent = "";
            bookAuthor.style.borderColor = "black";
        }

        if(publishedDate.value === "" && publishedDateWarning.textContent === ""){
            publishedDateWarning.textContent = "Please enter a published date.";
            publishedDate.style.borderColor = "red";
        }
        if(publishedDate.value !== ""){
            publishedDateWarning.textContent = "";
            publishedDate.style.borderColor = "black";
        }

        if(totalPages.value === "" && totalPagesWarning.textContent !== "Please enter total pages (max of 10 digits)."){
            totalPagesWarning.textContent = "Please enter total pages (max of 10 digits).";
            totalPages.style.borderColor = "red";
        }
        if(totalPages.value !== ""){
            totalPagesWarningCode();
        }

        if(pagesRead.value === "" && pagesReadWarning.textContent !== "Please enter pages read."){
            pagesReadWarning.textContent = "Please enter pages read.";
            pagesRead.style.borderColor = "red";
        }
        if(pagesRead.value !== ""){
            PagesReadWarningCode();
        }

        return;
    }

    // total book pages warning when everything else is filled in
    if(Number.isInteger(+totalPages.value) && +totalPages.value > 0 && +totalPages.value <= 9999999999){
        totalPagesWarning.textContent = "";
        totalPages.style.borderColor = "black";
    }
    else if(Number.isInteger(+totalPages.value) && +totalPages.value > 9999999999){
        totalPagesWarning.textContent = "Please enter a number less than 9,999,999,999 (10-digit max)";
        totalPages.style.borderColor = "red";
        PagesReadWarningCode();
        return;
    }
    else if(Number.isInteger(+totalPages.value) && +totalPages.value <= 0){
        totalPagesWarning.textContent = "Please enter a number bigger than 0.";
        totalPages.style.borderColor = "red";
        PagesReadWarningCode();
        return;
    }
    else{
        totalPagesWarning.textContent = "Please enter a valid number.";
        totalPages.style.borderColor = "red";
        PagesReadWarningCode();
        return;
    }

    // pages read warning when everything else is filled in
    if(!Number.isInteger(+pagesRead.value)){
        pagesReadWarning.textContent = "Please enter a valid number.";
        pagesRead.style.borderColor = "red";
        totalPagesWarningCode();
        return;
    }
    else if(Number.isInteger(+pagesRead.value) && +pagesRead.value > +totalPages.value){
        pagesReadWarning.textContent = "Please enter a number less than or equal to total pages.";
        pagesRead.style.borderColor = "red";
        totalPagesWarningCode();
        return;
    }
    else if(Number.isInteger(+pagesRead.value) && +pagesRead.value < 0){
        pagesReadWarning.textContent = "Please enter a non-negative number."
        pagesRead.style.borderColor = "red";
        totalPagesWarningCode();
        return;
    }
    else{
        pagesRead.style.borderColor = "black";
    }

    bookTitle.style.borderColor = "black";
    bookAuthor.style.borderColor = "black";
    publishedDate.style.borderColor = "black";


    bookTitleWarning.textContent = "";
    bookAuthorWarning.textContent = "";
    publishedDateWarning.textContent = "";
    totalPagesWarning.textContent = "";
    pagesReadWarning.textContent = "";


    // add to myLibrary
    myLibrary.push(new Book(i, bookTitle.value, bookAuthor.value, publishedDate.value, totalPages.value, pagesRead.value, readUnread.value));
    // store in local storage
    localStorage.setItem("library", JSON.stringify(myLibrary));

    // make (and update) copy of myLibrary
    copyLibrary = [...myLibrary];
    // if options are not fully chosen, just add book info
    if(sortingOptions.value == "" || sortingDirections.value == ""){
        let bookContent = "";
        let checkBox = `
            <input type="checkbox" class="read-toggle-checkbox" id="read-toggle-checkbox${i}" onchange="readToggleBtn(this)">
            <label for="read-toggle-checkbox${i}" class="read-toggle-label">
                <div class="ball"></div>
            </label>`
    
        if(readUnread.value === "read"){
            checkBox = `
            <input type="checkbox" class="read-toggle-checkbox" id="read-toggle-checkbox${i}" onchange="readToggleBtn(this)" checked>
            <label for="read-toggle-checkbox${i}" class="read-toggle-label">
                <div class="ball"></div>
            </label>`;
        }
    
        bookContent = `
            <h2 class="book-title">${bookTitle.value}</h2>
            <p class="book-author">By: ${bookAuthor.value}</p>
            <p class="book-published">Published: ${publishedDate.value}</p>
            <p class="book-pages">Pages: ${pagesRead.value} / ${totalPages.value}</p>
            <div class="read-toggle-container">
                <p>Mark as read:</p>
                <div>
                    ${checkBox}
                </div>
            </div>
            <div class="update-btns" id="update-btns">
                <button class="remove-btn" onclick="removeBookInfo(this.parentElement.parentElement)">Remove</button>
                <button class="edit-btn" onclick="editBookInfo(this.parentElement.parentElement)">Edit</button>
            </div>`;
    
        let gridAddBtn = document.getElementById("grid-add-btn");
        bookGrid = document.getElementById("book-grid");
        let div = document.createElement("div");
        div.classList.add("book-info");
        div.setAttribute("id", `${i}`);

        if(readUnread.value === "read"){
            div.classList.add("toggle-read-slider");
        }

        div.insertAdjacentHTML("afterbegin", bookContent);
        gridAddBtn.insertAdjacentElement("beforebegin", div);

    }
    // if BOTH options chosen, use copyLibrary array to list books into grid
    else if(sortingDirections.value == "Ascending"){
        myLibraryAscending(copyLibrary);
        //delete book info divs but not grid-add-btn
        document.querySelectorAll(".book-info").forEach(bookInfo => bookInfo.remove());
        // load myLibrary to DOM
        createBook(copyLibrary);
    }
    else if(sortingDirections.value == "Descending"){
        myLibraryDescending(copyLibrary);
        //delete book info divs but not grid-add-btn
        document.querySelectorAll(".book-info").forEach(bookInfo => bookInfo.remove());
        // load myLibrary to DOM
        createBook(copyLibrary);
    }

    // close modal
    bookModal.classList.remove("active");
    overlay.classList.remove("active");

    addGeneralInfo();
    clearModalValues();

    i++;
});

function readToggleBtn(toggleBtn){
    toggleBtn.parentElement.parentElement.parentElement.classList.toggle("toggle-read-slider");

    generalBook = document.getElementById("books-value");
    generalCompletedBooks = document.getElementById("completed-books-value");
    bookToggleCheckbox = toggleBtn.parentElement.parentElement.parentElement.querySelector(".read-toggle-checkbox");

    //change completed books in general info
    if(bookToggleCheckbox.checked){
        generalCompletedBooks.textContent = lengthGreaterThan10(+generalCompletedBooks.textContent + 1);
    }
    else{
        generalCompletedBooks.textContent = lengthGreaterThan10(+generalCompletedBooks.textContent - 1);
    }

    // change compeletion rate for books
    if(+generalCompletedBooks.textContent == 0 || +generalBook.textContent == 0){
        generalCompletionRateBooks.textContent = 0;
    }
    else{
        generalCompletionRateBooks.textContent = Number.parseFloat((+generalCompletedBooks.textContent)/(+generalBook.textContent) * 100).toFixed(2);
    }

    // update general info localstorage
    generalInfo.completedBooks = generalCompletedBooks.textContent;
    generalInfo.bookCompletionRate = generalCompletionRateBooks.textContent;
    localStorage.setItem("generalInfo", JSON.stringify(generalInfo));

    // if slider changes value, update myLibrary
    myLibrary.forEach(book =>{
        if(book.id == toggleBtn.parentElement.parentElement.parentElement.id){
            if(book.read == "read"){
                book.read = "unread";
            }
            else{
                book.read = "read";
            }
            return;
        }
    });
    // store modified myLibrary array
    localStorage.setItem("library", JSON.stringify(myLibrary));

    // change edit modal values
    if(toggleBtn.checked == true){
        editReadUnread.selectedIndex = 1;
    }
    else{
        editReadUnread.selectedIndex = 0;
    }
}

//edit warnings
let editBookTitleWarning = document.getElementById("edit-book-title-warning");
let editBookAuthorWarning = document.getElementById("edit-book-author-warning");
let editPublishedDateWarning = document.getElementById("edit-published-date-warning");
let editTotalPagesWarning = document.getElementById("edit-total-pages-warning");
let editPagesReadWarning = document.getElementById("edit-pages-read-warning");

let selectBookDiv = "";
function editBookInfo(bookDiv){
    selectBookDiv = bookDiv;
    editBookModal.classList.add("active");
    overlay.classList.add("active");

    bookInfoTitle = bookDiv.querySelector("h2");
    bookInfoAuthor = bookDiv.querySelector(".book-author");
    bookInfoPublished = bookDiv.querySelector(".book-published");
    bookInfoPages = bookDiv.querySelector(".book-pages");
    bookToggleCheckbox = bookDiv.querySelector(".read-toggle-checkbox");

    // book title
    editBookTitle.value = bookInfoTitle.textContent;

    // book author
    let editedAuthor = bookInfoAuthor.textContent.replace("By: ", "");
    editBookAuthor.value = editedAuthor;

    // book publishcation date
    let editedPublished = bookInfoPublished.textContent.replace("Published: ", "");
    editPublishedDate.value = editedPublished;

    // book pages read and total pages
    let editedBookPages = bookInfoPages.textContent.replace("Pages: ", "");
    let editedPagesRead = editedBookPages.split(" / ")[0];
    let editedTotalPages = editedBookPages.split(" / ")[1];
    editPagesRead.value = editedPagesRead;
    editTotalPages.value = editedTotalPages;

    // check if user read the book or not
    if(bookToggleCheckbox.checked){
        editReadUnread.selectedIndex = 1;
    }
    else{
        editReadUnread.selectedIndex = 0;
    }
}

// EDIT modal btn
function editTotalPagesCode(){
    if(Number.isInteger(+editTotalPages.value) && +editTotalPages.value > 0 && +editTotalPages.value <= 9999999999){
        editTotalPagesWarning.textContent = "";
        editTotalPages.style.borderColor = "black";
    }
    else if(Number.isInteger(+editTotalPages.value) && +editTotalPages.value > 9999999999){
        editTotalPagesWarning.textContent = "Please enter a number less than 9,999,999,999 (10-digit max)";
        editTotalPages.style.borderColor = "red";
    }
    else if(Number.isInteger(+editTotalPages.value) && +editTotalPages.value <= 0){
        editTotalPagesWarning.textContent = "Please enter a number bigger than 0.";
        editTotalPages.style.borderColor = "red";
    }
    else{
        editTotalPagesWarning.textContent = "Please enter a valid number.";
        editTotalPages.style.borderColor = "red";
    }
}

function editPagesReadCode(){
    if(!Number.isInteger(+editPagesRead.value)){
        editPagesReadWarning.textContent = "Please enter a valid number.";
        editPagesRead.style.borderColor = "red";
    }
    else if(Number.isInteger(+editPagesRead.value) && +editPagesRead.value > +editTotalPages.value){
        editPagesReadWarning.textContent = "Please enter a number less than or equal to total pages.";
        editPagesRead.style.borderColor = "red";
    }
    else if(Number.isInteger(+editPagesRead.value) && +editPagesRead.value < 0){
        editPagesReadWarning.textContent = "Please enter a non-negative number."
        editPagesRead.style.borderColor = "red";
    }
    else{
        editPagesReadWarning.textContent = "";
        editPagesRead.style.borderColor = "black";
    }
}

editBtn.addEventListener("click", () =>{
    if(editBookTitle.value === "" || editBookAuthor.value === "" || editPublishedDate.value === "" || editTotalPages.value === "" || editPagesRead.value === ""){
        if(editBookTitle.value === "" && editBookTitleWarning.textContent === ""){
            editBookTitleWarning.textContent = "Please enter a book title.";
            editBookTitle.style.borderColor = "red";
        }
        if(editBookTitle.value !== ""){
            editBookTitleWarning.textContent = "";
            editBookTitle.style.borderColor = "black";
        }

        if(editBookAuthor.value === "" && editBookAuthorWarning.textContent === ""){
            editBookAuthorWarning.textContent = "Please enter a book author.";
            editBookAuthor.style.borderColor = "red";
        }
        if(editBookAuthor.value !== ""){
            editBookAuthorWarning.textContent = "";
            editBookAuthor.style.borderColor = "black";
        }

        if(editPublishedDate.value === "" && editPublishedDateWarning.textContent === ""){
            editPublishedDateWarning.textContent = "Please enter a published date.";
            editPublishedDate.style.borderColor = "red";
        }
        if(editPublishedDate.value !== ""){
            editPublishedDateWarning.textContent = "";
            editPublishedDate.style.borderColor = "black";
        }

        if(editTotalPages.value === "" && editTotalPagesWarning.textContent !== "Please enter total pages (max of 10 digts)."){
            editTotalPagesWarning.textContent = "Please enter total pages (max of 10 digts).";
            editTotalPages.style.borderColor = "red";
        }
        if(editTotalPages.value !== ""){
            editTotalPagesCode();
        }

        if(editPagesRead.value === "" && editPagesReadWarning.textContent !== "Please enter pages read."){
            editPagesReadWarning.textContent = "Please enter pages read.";
            editPagesRead.style.borderColor = "red";
        }
        if(editPagesRead.value !== ""){
            editPagesReadCode();
        }

        return;
    }

    // total pages warning when everything else filled out
    if(Number.isInteger(+editTotalPages.value) && +editTotalPages.value > 0 && +editTotalPages.value <= 9999999999){
        editTotalPagesWarning.textContent = "";
        editTotalPages.style.borderColor = "black";
    }
    else if(Number.isInteger(+editTotalPages.value) && +editTotalPages.value > 9999999999){
        editTotalPagesWarning.textContent = "Please enter a number less than 9,999,999,999 (10-digit max)";
        editTotalPages.style.borderColor = "red";
        editPagesReadCode();
        return
    }
    else if(Number.isInteger(+editTotalPages.value) && +editTotalPages.value <= 0){
        editTotalPagesWarning.textContent = "Please enter a number bigger than 0.";
        editTotalPages.style.borderColor = "red";
        editPagesReadCode();
        return
    }
    else{
        editTotalPagesWarning.textContent = "Please enter a valid number.";
        editTotalPages.style.borderColor = "red";
        editPagesReadCode();
        return
    }

    // pages read warning when everything else filled out
    if(!Number.isInteger(+editPagesRead.value)){
        editPagesReadWarning.textContent = "Please enter a valid number.";
        editPagesRead.style.borderColor = "red";
        editTotalPagesCode();
        return;
    }
    else if(Number.isInteger(+editPagesRead.value) && +editPagesRead.value > +editTotalPages.value){
        editPagesReadWarning.textContent = "Please enter a number less than or equal to total pages.";
        editPagesRead.style.borderColor = "red";
        editTotalPagesCode();
        return;
    }
    else if(Number.isInteger(+editPagesRead.value) && +editPagesRead.value < 0){
        editPagesReadWarning.textContent = "Please enter a non-negative number."
        editPagesRead.style.borderColor = "red";
        editTotalPagesCode();
        return;
    }
    else{
        editPagesReadWarning.textContent = "";
        editPagesRead.style.borderColor = "black";
    }
    
    editBookTitleWarning.textContent = "";
    editBookAuthorWarning.textContent = "";
    editPublishedDateWarning.textContent = "";
    editTotalPagesWarning.textContent = "";
    editPagesReadWarning.textContent = "";

    editBookTitle.style.borderColor = "black";
    editBookAuthor.style.borderColor = "black";
    editPublishedDate.style.borderColor = "black";

    //general info update and localstorage
    getGeneralInfo();
    bookInfoPages = selectBookDiv.querySelector(".book-pages");
    let justBookNumbers = bookInfoPages.textContent.replace("Pages: ", "");
    let splitPagesRead = justBookNumbers.split(" / ")[0];
    let splitTotalPages = justBookNumbers.split(" / ")[1];
    bookToggleCheckbox = selectBookDiv.querySelector(".read-toggle-checkbox");

        // general info read/unread
    if(bookToggleCheckbox.checked && editReadUnread.value == "unread"){
        generalCompletedBooks.textContent = lengthGreaterThan10(+generalCompletedBooks.textContent - 1);
    }
    else if(!bookToggleCheckbox.checked && editReadUnread.value == "read"){
        generalCompletedBooks.textContent = lengthGreaterThan10(+generalCompletedBooks.textContent + 1);
    }

        // general info pages read update
    generalPagesRead.textContent = lengthGreaterThan10(+generalPagesRead.textContent - +splitPagesRead + +editPagesRead.value);

        // general info total pages update
    generalTotalPages.textContent = lengthGreaterThan10(+generalTotalPages.textContent - +splitTotalPages + +editTotalPages.value);   

        // general info completion rates
    if(+generalCompletedBooks.textContent == 0 || +generalBook.textContent == 0){
        generalCompletionRateBooks.textContent = 0;
    }
    else{
        generalCompletionRateBooks.textContent = Number.parseFloat((+generalCompletedBooks.textContent)/(+generalBook.textContent) * 100).toFixed(2);
    }
    if(+generalPagesRead.textContent == 0 || +generalTotalPages.textContent == 0){
        generalCompletionRatePages.textContent = 0;
    }
    else{
        generalCompletionRatePages.textContent = Number.parseFloat((+generalPagesRead.textContent)/(+generalTotalPages.textContent) * 100).toFixed(2);
    }

        // general info localstorage
    generalInfo.bookNum = generalBook.textContent;
    generalInfo.completedBooks = generalCompletedBooks.textContent;
    generalInfo.generalPagesRead = generalPagesRead.textContent;
    generalInfo.generalTotalPages = generalTotalPages.textContent;
    generalInfo.bookCompletionRate = generalCompletionRateBooks.textContent;
    generalInfo.pagesCompletionRate = generalCompletionRatePages.textContent;
    localStorage.setItem("generalInfo", JSON.stringify(generalInfo));

    // local storage
    // replace specific info with edited info
    myLibrary.forEach((book, index) =>{
        if(book.id == selectBookDiv.id){
            myLibrary.splice(index, 1, new Book(book.id, editBookTitle.value, editBookAuthor.value, editPublishedDate.value, editTotalPages.value, editPagesRead.value, editReadUnread.value));
            return;
        }
    });
    // store modified myLibrary array
    localStorage.setItem("library", JSON.stringify(myLibrary));

    copyLibrary = [...myLibrary];
    // if options are not fully chosen, just edit the select book div
    if(sortingOptions.value == "" || sortingDirections.value == ""){
        // put info back into book info
        bookInfoTitle.textContent = editBookTitle.value;
        bookInfoAuthor.textContent = `By: ${editBookAuthor.value}`;
        bookInfoPublished.textContent =`Published: ${editPublishedDate.value}`;
        bookInfoPages.textContent = `Pages: ${editPagesRead.value} / ${editTotalPages.value}`;


        // if book info slider says "read", make edit div show "read"
        bookToggleCheckbox = selectBookDiv.querySelector(".read-toggle-checkbox");
        if(editReadUnread.value === "read"){
            bookToggleCheckbox.checked = true;
            selectBookDiv.classList.add("toggle-read-slider");
        }
        else{
            bookToggleCheckbox.checked = false;
            selectBookDiv.classList.remove("toggle-read-slider");
        }
    }
    // if BOTH options chosen, use copyLibrary array to list books into grid
    else if(sortingDirections.value == "Ascending"){
        myLibraryAscending(copyLibrary);
        //delete book info divs but not grid-add-btn
        document.querySelectorAll(".book-info").forEach(bookInfo => bookInfo.remove());
        // load myLibrary to DOM
        createBook(copyLibrary);
    }
    else if(sortingDirections.value == "Descending"){
        myLibraryDescending(copyLibrary);
        //delete book info divs but not grid-add-btn
        document.querySelectorAll(".book-info").forEach(bookInfo => bookInfo.remove());
        // load myLibrary to DOM
        createBook(copyLibrary);
    }
    
    editBookModal.classList.remove("active");
    overlay.classList.remove("active");
});

//burger menu toggle for general info
let burgerMenu = document.getElementById("burger-menu");
let generalInfoContainer = document.getElementById("general-info-container");
burgerMenu.addEventListener("click", () =>{
    generalInfoContainer.style.transform = "translateX(0%)";
});

//close btn for general info
let generalCloseBtn = document.getElementById("general-close-btn");
generalCloseBtn.addEventListener("click", () =>{
    generalInfoContainer.style.transform = "translateX(100%)";
});


//delete history
let deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("click", () =>{
    //delete book info divs and not grid-add-btn
    document.querySelectorAll(".book-info").forEach(bookInfo => bookInfo.remove());
    //clear library
    myLibrary = [];
    // reset id
    i = 0;
    // reset general info
    generalBook.textContent = "0";
    generalCompletedBooks.textContent = "0";
    generalPagesRead.textContent = "0";
    generalTotalPages.textContent = "0";
    generalCompletionRateBooks.textContent = "0";
    generalCompletionRatePages.textContent = "0";
    // delete everything in local storage
    localStorage.clear();
});

// load local storage if it exists
if(localStorage.length > 0 && localStorage.getItem("library") != "[]" && localStorage.getItem("generalInfo") != '{"bookNum":"0","completedBooks":"0","generalPagesRead":"0","generalTotalPages":"0","bookCompletionRate":"0","pagesCompletionRate":"0"}'){
    // load in myLibrary from local storage
    createBook(JSON.parse(localStorage.getItem("library")));

    // general info
    let genInfo = JSON.parse(localStorage.getItem("generalInfo"));
    generalBook.textContent = genInfo.bookNum;
    generalCompletedBooks.textContent = genInfo.completedBooks;
    generalPagesRead.textContent = genInfo.generalPagesRead;
    generalTotalPages.textContent = genInfo.generalTotalPages;
    generalCompletionRateBooks.textContent = genInfo.bookCompletionRate;
    generalCompletionRatePages.textContent = genInfo.pagesCompletionRate;
}

// sorting functions
function myLibraryAscending(lib){
    switch(sortingOptions.value){
        case "Insertion Date":
            // get id of ojects and sort
            lib.sort((a,b) => +a.id > +b.id ? 1 : -1);
            break;
        case "Author":
            // get author of ojects and sort
            lib.sort((a,b) => a.author > b.author ? 1 : -1);
            break;
        case "Book Title":
            // get book title of ojects and sort
            lib.sort((a,b) => a.title > b.title ? 1 : -1);
            break;
        case "Publishing Date":
            // get publishing date of ojects and sort
            lib.sort((a,b) => {
                aSplit = a.publication.split("-");
                console.log(aSplit);
                bSplit = b.publication.split("-");
                console.log(bSplit);
                //0 = year, 1 = month; 2 = day
                if(+aSplit[0] > +bSplit[0]){
                    return 1;
                }
                else{
                    if(+aSplit[1] > +bSplit[1]){
                        return 1;
                    }
                    else{
                        if(+aSplit[2] > +bSplit[2]){
                            return 1;
                        }
                    }
                    return -1;
                }
            });
            break;
        case "Total Pages":
            // get total pages of ojects and sort
            lib.sort((a,b) => +a.totalPages > +b.totalPages ? 1 : -1);
            console.log(myLibrary);
            break;
        case "Pages Read":
            // get read pages of ojects and sort
            lib.sort((a,b) => +a.pagesRead > +b.pagesRead ? 1 : -1);
            console.log(myLibrary);
            break;
    }
}

function myLibraryDescending(lib){
    switch(sortingOptions.value){
        case "Insertion Date":
            // get id of ojects and sort
            lib.sort((a,b) => +a.id < +b.id ? 1 : -1);
            console.log(myLibrary);
            break;
        case "Author":
            // get author of ojects and sort
            lib.sort((a,b) => a.author < b.author ? 1 : -1);
            console.log(myLibrary);
            break;
        case "Book Title":
            // get book title of ojects and sort
            lib.sort((a,b) => a.title < b.title ? 1 : -1);
            console.log(myLibrary);
            break;
        case "Publishing Date":
            // get publishing date of ojects and sort
            lib.sort((a,b) => {
                aSplit = a.publication.split("-");
                console.log(aSplit);
                bSplit = b.publication.split("-");
                console.log(bSplit);
                //0 = year, 1 = month; 2 = day
                if(+aSplit[0] < +bSplit[0]){
                    return 1;
                }
                else{
                    if(+aSplit[1] < +bSplit[1]){
                        return 1;
                    }
                    else{
                        if(+aSplit[2] < +bSplit[2]){
                            return 1;
                        }
                    }
                    return -1;
                }
            });
            console.log(myLibrary);
            break;
        case "Total Pages":
            // get total pages of ojects and sort
            lib.sort((a,b) => +a.totalPages < +b.totalPages ? 1 : -1);
            console.log(myLibrary);
            break;
        case "Pages Read":
            // get read pages of ojects and sort
            lib.sort((a,b) => +a.pagesRead < +b.pagesRead ? 1 : -1);
            console.log(myLibrary);
            break;
    }
}

// don't mutate myLibrary, but make a copy
sortingOptions.addEventListener("change", () =>{
    copyLibrary = [...myLibrary];
    if(sortingDirections.value == "Ascending"){
        myLibraryAscending(copyLibrary);
    }
    else if(sortingDirections.value == "Descending"){
        myLibraryDescending(copyLibrary);
    }

    //delete book info divs but not grid-add-btn
    document.querySelectorAll(".book-info").forEach(bookInfo => bookInfo.remove());
    // load myLibrary to DOM
    createBook(copyLibrary);
});

sortingDirections.addEventListener("change", () =>{
    copyLibrary = [...myLibrary];
    switch(sortingDirections.value){
        case "Ascending":
            myLibraryAscending(copyLibrary);
            break;
        case "Descending":
            myLibraryDescending(copyLibrary);
            break;
    }

    //delete book info divs but not grid-add-btn
    document.querySelectorAll(".book-info").forEach(bookInfo => bookInfo.remove());
    // load myLibrary to DOM
    createBook(copyLibrary);
});

optionUnread.addEventListener("click", () =>{
    let filteredUnread = myLibrary.filter(book => book.read == "unread");

    if(sortingDirections.value == "Ascending"){
        myLibraryAscending(filteredUnread);
    }
    else if(sortingDirections.value == "Descending"){
        myLibraryDescending(filteredUnread);
    }

    //delete book info divs but not grid-add-btn
    document.querySelectorAll(".book-info").forEach(bookInfo => bookInfo.remove());
    // load filteredUnread to DOM
    createBook(filteredUnread);
});

optionRead.addEventListener("click", () =>{
    let filteredRead = myLibrary.filter(book => book.read == "read");

    if(sortingDirections.value == "Ascending"){
        myLibraryAscending(filteredRead);
    }
    else if(sortingDirections.value == "Descending"){
        myLibraryDescending(filteredRead);
    }

    //delete book info divs but not grid-add-btn
    document.querySelectorAll(".book-info").forEach(bookInfo => bookInfo.remove());
    // load filteredUnread to DOM
    createBook(filteredRead);
});

// load myLibrary to DOM
function createBook(library){
    library.forEach(book =>{
        let bookContent = "";
        let checkBox = `
            <input type="checkbox" class="read-toggle-checkbox" id="read-toggle-checkbox${book.id}" onchange="readToggleBtn(this)">
            <label for="read-toggle-checkbox${book.id}" class="read-toggle-label">
                <div class="ball"></div>
            </label>`
    
        if(book.read === "read"){
            checkBox = `
            <input type="checkbox" class="read-toggle-checkbox" id="read-toggle-checkbox${book.id}" onchange="readToggleBtn(this)" checked>
            <label for="read-toggle-checkbox${book.id}" class="read-toggle-label">
                <div class="ball"></div>
            </label>`;
        }
    
        bookContent = `
            <h2 class="book-title">${book.title}</h2>
            <p class="book-author">By: ${book.author}</p>
            <p class="book-published">Published: ${book.publication}</p>
            <p class="book-pages">Pages: ${book.pagesRead} / ${book.totalPages}</p>
            <div class="read-toggle-container">
                <p>Mark as read:</p>
                <div>
                    ${checkBox}
                </div>
            </div>
            <div class="update-btns" id="update-btns">
                <button class="remove-btn" onclick="removeBookInfo(this.parentElement.parentElement)">Remove</button>
                <button class="edit-btn" onclick="editBookInfo(this.parentElement.parentElement)">Edit</button>
            </div>`;
    
        let gridAddBtn = document.getElementById("grid-add-btn");
        bookGrid = document.getElementById("book-grid");
        let div = document.createElement("div");
        div.classList.add("book-info");
        div.setAttribute("id", `${book.id}`);
    
        if(book.read === "read"){
            div.classList.add("toggle-read-slider");
        }
    
        div.insertAdjacentHTML("afterbegin", bookContent);
        gridAddBtn.insertAdjacentElement("beforebegin", div);
    });
}
