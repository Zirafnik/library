let myLibrary = [
    {
    title: 'Robinson Crusoe',
    author: 'Daniel Dafoe',
    pages: 198,
    read: 'yes'
    },

    {
    title: 'The Art of War',    
    author: 'Sun Tzu',
    pages: 260,
    read: 'yes'
    },

    {
    title: 'War and Peace',
    author: 'Leo Tolstoy',
    pages: 1225,
    read: 'no'
    }];

//LOCAL STORAGE
//check if exists
function getLocalStorage() {
    if (typeof(Storage) !== "undefined") {
        myLibrary= JSON.parse(window.localStorage.getItem('dataBooks'));
        } else {
        console.log('no storage support');
    }
}
getLocalStorage();

function updateLocalStorage() {
    window.localStorage.clear();
    window.localStorage.setItem('dataBooks', JSON.stringify(myLibrary));  //JSON.stringify enumerates propreties, so it will not include non-enumerable
}


//random background colors
function getColor(){ 
    return "hsl(" + 360 * Math.random() + ',' +
               (25 + 70 * Math.random()) + '%,' + 
               (85 + 10 * Math.random()) + '%)'
  }



function Book(author, title, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    updateLocalStorage();
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
            if (key !== 'background') {
                let lineInfo= document.createElement('div');
                lineInfo.textContent= key + ': ' + value;
                addedBook.appendChild(lineInfo);
            }
        }
        

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
                //replace with myLibrary.method() which will toggle and is located in prototype
                //does it matter? i would only be replacing .read='';
                myLibrary[e.target.parentNode.getAttribute('data-place')].read= 'yes';
                console.log('now its checked');
            } else {
                myLibrary[e.target.parentNode.getAttribute('data-place')].read= 'no';
                console.log('now its unchecked');
            }
            updateLocalStorage();
        })
        addedBook.appendChild(readBtn);

        //add delete button to div
        let deleteBtn= document.createElement('button');
        deleteBtn.textContent= 'Delete';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', function(e) {
            container.removeChild(e.target.parentNode);
            myLibrary.splice(e.target.parentNode.getAttribute('data-place'), 1);
            displayBooks();
            updateLocalStorage();
        })
        addedBook.appendChild(deleteBtn);
        
        //added books propreties
        addedBook.setAttribute('data-place', myLibrary.indexOf(book));
        addedBook.classList.add('books');
        addedBook.style.background= book.background;
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
        container.style.cssText= `height: 86%;`;
    } else if(form.style.display == 'none' || form.style.display == '') {
        container.style.cssText= 'height: 56%;';
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

        newInstance.background= `${getColor()}`;

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