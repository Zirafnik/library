# Library App
This app allows you to save books locally to your library. 

I added a pop-form which doesn't cover the display div, but only shortens it, which also gives it a scrollbar.

Additionally I added the functionality to change whether you read the book, directly in the display, as well as the option to delete the book (deletes the exact book from display as well as array).

One thing I learned from scratch is how local storage works. I have been able to implement it in this project, so each time you reload/leave the page, your books are saved and reload when you comeback.

I also made it so, that each book is assigned a random color from pastel range and this color is then saved in the object, so each time you reload from local storage the color is the same and doesn't change.

Lastly I added the button which sorts the books in the display by Author name. I only wanted to sort the display, but not actually change the real order of books in the array.


FUTURE-DEVELOPMENT:
-OOP
*for some reason it sorts already existing objects in myLibrary, and those pushed into it separately ==> I therefore commented out the 'demo' books like initially planned, leaving an empty library as a starting point (couldn't figure out what causes the bug)