let myLibrary = [
    {
    author: 'Daniel Dafoe',
    title: 'Robinson Crusoe',
    pages: '198',
    read: 'yes',
    background: 'hsl(147, 83%, 86%)'
    },

    {
    author: 'Sun Tzu',
    title: 'The Art of War',    
    pages: '260',
    read: 'yes',
    background: 'hsl(354, 87%, 86%)'
    },

    {
    author: 'Leo Tolstoy',
    title: 'War and Peace',
    pages: '1225',
    read: 'no',
    background: 'hsl(225, 83%, 86%)'
    }];

//LOCAL STORAGE
//check if exists
function getLocalStorage() {
    if (typeof(Storage) !== "undefined" && window.localStorage.length!=0) {
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
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    updateLocalStorage();
}

//displaying
const container= document.querySelector('#container');
function displayBooks(chosenArray) {
    //remove previous display, because it always prints full array
    while (container.lastElementChild) {
        container.removeChild(container.lastElementChild);
    }
    
    //create new book divs
    chosenArray.forEach(book => {
        let addedBook= document.createElement('div');
        for(const[key, value] of Object.entries(book)) {
            if (key !== 'background' && key!== 'read') {
                let lineInfo= document.createElement('div');
                lineInfo.textContent= key + ': ' + value;
                addedBook.appendChild(lineInfo);
            }
        }
        

        //add read button to div
        let readCont= document.createElement('div');
        let readBtn= document.createElement('input');
        readBtn.setAttribute('id', 'readBtn');
        let readText= document.createElement('span');
        readText.textContent= 'read:';
        readCont.appendChild(readText);
        readBtn.setAttribute('type', 'checkbox');
        if(book.read== 'yes') {
            readBtn.setAttribute('checked', 'true');
        }
        readBtn.addEventListener('click', function(e) {
            if(e.target.checked) {
                //replace with myLibrary.method() which will toggle and is located in prototype
                //does it matter? i would only be replacing .read='';
                myLibrary[e.target.parentNode.parentNode.getAttribute('data-place')].read= 'yes';
                console.log('now its checked');
            } else {
                myLibrary[e.target.parentNode.parentNode.getAttribute('data-place')].read= 'no';
                console.log('now its unchecked');
            }
            updateLocalStorage();
        })
        readCont.appendChild(readBtn);
        addedBook.appendChild(readCont);

        //add delete button to div
        let deleteBtn= document.createElement('button');
        deleteBtn.textContent= 'Delete';
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.addEventListener('click', function(e) {
            container.removeChild(e.target.parentNode);
            myLibrary.splice(e.target.parentNode.getAttribute('data-place'), 1);
            displayBooks(myLibrary);
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
//runs once at the beginning 
displayBooks(myLibrary); //once this runs it updates the display (deletes previous divs, and creates new ones, also resetting the propreties)

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

const footer= document.querySelector('#footer');
const newBtn= document.querySelector('#newBtn');
newBtn.addEventListener('click', adjustFooterHeight);

function adjustFooterHeight() {   
    if(form.style.display == 'block') {
        formToggle.closeForm();
        container.style.cssText= `height: 86%;`;
        footer.style.cssText= 'height: 0%';

    } else if(form.style.display == 'none' || form.style.display == '') {
        container.style.cssText= 'height: 56%;';
        footer.style.cssText= 'height: 30%';
        formToggle.openForm();
    }
}

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
    displayBooks(myLibrary);
    form.reset();
    formToggle.closeForm();
    container.style.cssText= `height: 86%;`;
    footer.style.cssText= 'height: 0%';
}

//in html onclick
function closeBtn() {
    formToggle.closeForm();
    form.reset();
    container.style.cssText= `height: 86%;`;
    footer.style.cssText= 'height: 0%';
}

//sorts display
function sortByAuthor() {
    let sorted= [...myLibrary];
    sorted.sort((a, b) => (a.author > b.author) ? 1 : -1);
    displayBooks(sorted);
}

const sortBtn= document.querySelector('#sortBtn');
sortBtn.addEventListener('click', sortByAuthor);