let myLibrary = [{author: 'Cankar', pages: 300}, {author: 'Preseren', pages: 20}];

function Book(author, title, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
}

//displaying
const container= document.querySelector('#container');
function displayBooks() {
    //remove previous display, because it always prints full array
    while (container.lastElementChild) {
        container.removeChild(container.lastElementChild);
    }
    
    //create new book divs
    myLibrary.forEach(book => {
        let addedBook= document.createElement('div');
        for(const[key, value] of Object.entries(book)) {
            let lineInfo= document.createElement('div');
            lineInfo.textContent= key + ': ' + value;
            addedBook.appendChild(lineInfo);
        }
        
        //add delete button to div
        let deleteBtn= document.createElement('button');
        deleteBtn.textContent= 'Delete';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', function(e) {
            container.removeChild(e.target.parentNode);
            myLibrary.splice(e.target.parentNode.getAttribute('data-place'), 1);
            displayBooks();
        })
        addedBook.appendChild(deleteBtn);

        //add read button to div
        let readBtn= document.createElement('input');
        let readText= document.createElement('span');
        readText.textContent= 'Read';
        addedBook.appendChild(readText);
        readBtn.setAttribute('type', 'checkbox');
        if(book.read== 'yes') {
            readBtn.setAttribute('checked', 'true');
        }
        readBtn.addEventListener('click', function(e) {
            if(e.target.checked) {
                myLibrary[e.target.parentNode.getAttribute('data-place')].read= 'yes';
                console.log('now its checked');
            } else {
                myLibrary[e.target.parentNode.getAttribute('data-place')].read= 'no';
                console.log('now its unchecked');
            }
        })
        addedBook.appendChild(readBtn);
        
        //added books propreties
        addedBook.setAttribute('data-place', myLibrary.indexOf(book));
        addedBook.classList.add('books');
        container.appendChild(addedBook);
    });
}

displayBooks(); //once this runs it updates the display (deletes previous divs, and creates new ones, also resetting the propreties)

//pop-up form
let form= document.querySelector('#form-container');
let formToggle= {
    openForm: function() {
        form.style.display= 'block';
    },
    closeForm: function() {
        form.style.display= 'none';
    }
}

const newBtn= document.querySelector('#newBtn');
newBtn.addEventListener('click', function() {   
    if(form.style.display == 'block') {
        formToggle.closeForm();
    } else if(form.style.display == 'none' || form.style.display == '') {
        formToggle.openForm();
    }
});

//creating new entry object to myLibrary- in html onlick
function getReadValue() {
    let read= document.getElementById('read');
    
    if(read.checked) {
        return 'yes';
    } else {
        return 'no';
    }
}
function createBook() {
    let newInstance= new Book(
        document.getElementById('author').value,
        document.getElementById('title').value,
        document.getElementById('pages').value,
        getReadValue() );
    
    addBookToLibrary(newInstance);
    displayBooks();
    form.reset();
    formToggle.closeForm();
}
//in html onclick
function closeBtn() {
    formToggle.closeForm();
    form.reset();
}