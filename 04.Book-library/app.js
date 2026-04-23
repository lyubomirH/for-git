// Book Library Application
// Base URL for the server API
const BASE_URL = 'http://localhost:3030/jsonstore/collections/books';

// DOM Elements
const loadBooksBtn = document.getElementById('loadBooks');
const bookForm = document.getElementById('bookForm');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const submitBtn = document.getElementById('submitBtn');
const booksTable = document.querySelector('table');

// State for tracking which book we're editing (null = create mode)
let editBookId = null;

// Helper function to get the tbody element
function getTbody() {
    return document.querySelector('table tbody');
}

// Load all books from the server and display them in the table
async function loadAllBooks() {
    const tbody = getTbody();
    
    // Fetch all books from the server
    const response = await fetch(BASE_URL);
    const booksData = await response.json();
    
    // Get all keys from the booksData object
    const bookIds = Object.keys(booksData);
    
    // Build the HTML string for all rows (without onclick handlers)
    let rowsHtml = '';
    
    // Loop through each book ID using a for loop
    for (let i = 0; i < bookIds.length; i++) {
        const bookId = bookIds[i];
        const book = booksData[bookId];
        
        // Create the row HTML with data attributes instead of inline onclick
        rowsHtml += `
            <tr data-id="${bookId}">
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>
                    <button class="edit-btn" data-id="${bookId}" data-title="${book.title}" data-author="${book.author}">Edit</button>
                    <button class="delete-btn" data-id="${bookId}" data-title="${book.title}">Delete</button>
                </td>
            </tr>
        `;
    }
    
    // Set the innerHTML of tbody
    tbody.innerHTML = rowsHtml;
}

// Create a new book on the server
async function createBook(title, author) {
    const bookData = {
        title: title.trim(),
        author: author.trim()
    };
    
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData)
    });
    
    await response.json();
    
    // Reload the books list to show the new book
    await loadAllBooks();
}

// Update an existing book on the server
async function updateBook(bookId, title, author) {
    const bookData = {
        title: title.trim(),
        author: author.trim()
    };
    
    const response = await fetch(`${BASE_URL}/${bookId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData)
    });
    
    await response.json();
    
    // Reload the books list to show the updated book
    await loadAllBooks();
}

// Delete a book from the server
async function deleteBook(bookId) {
    await fetch(`${BASE_URL}/${bookId}`, {
        method: 'DELETE'
    });
    
    // Reload the books list to remove the deleted book
    await loadAllBooks();
}

// Handle Edit button click - populate form with book data
function onEditBook(id, title, author) {
    // Set edit mode
    editBookId = id;
    
    // Fill the form with the book's current data
    titleInput.value = title;
    authorInput.value = author;
    
    // Change button text to indicate edit mode
    submitBtn.textContent = 'Update Book';
    
    // Change form heading to indicate edit mode
    const formHeading = document.querySelector('form h3');
    formHeading.textContent = 'EDIT BOOK';
}

// Handle Delete button click
async function onDeleteBook(id, title) {
    const confirmDelete = confirm(`Are you sure you want to delete "${title}"?`);
    
    if (confirmDelete) {
        await deleteBook(id);
        
        // If we were editing this book, reset the form
        if (editBookId === id) {
            resetFormToCreateMode();
        }
    }
}

// Reset the form to create mode
function resetFormToCreateMode() {
    editBookId = null;
    titleInput.value = '';
    authorInput.value = '';
    submitBtn.textContent = 'Submit';
    
    const formHeading = document.querySelector('form h3');
    formHeading.textContent = 'FORM';
}

// Handle form submission (Create or Update based on mode)
async function onFormSubmit(event) {
    event.preventDefault();
    
    // Get input values
    const title = titleInput.value;
    const author = authorInput.value;
    
    // Validate inputs (non-empty)
    if (!title || title.trim() === '') {
        alert('Title cannot be empty!');
        return;
    }
    
    if (!author || author.trim() === '') {
        alert('Author cannot be empty!');
        return;
    }
    
    if (editBookId) {
        // UPDATE mode
        await updateBook(editBookId, title, author);
        resetFormToCreateMode();
    } else {
        // CREATE mode
        await createBook(title, author);
        resetFormToCreateMode();
    }
}

// Event delegation - handle clicks on Edit and Delete buttons
function onTableClick(event) {
    const target = event.target;
    
    // Handle Edit button click
    if (target.classList.contains('edit-btn')) {
        const id = target.getAttribute('data-id');
        const title = target.getAttribute('data-title');
        const author = target.getAttribute('data-author');
        onEditBook(id, title, author);
    }
    
    // Handle Delete button click
    if (target.classList.contains('delete-btn')) {
        const id = target.getAttribute('data-id');
        const title = target.getAttribute('data-title');
        onDeleteBook(id, title);
    }
}

// Event Listeners
loadBooksBtn.addEventListener('click', loadAllBooks);
bookForm.addEventListener('submit', onFormSubmit);
booksTable.addEventListener('click', onTableClick);

// Load books automatically when the page loads
loadAllBooks();