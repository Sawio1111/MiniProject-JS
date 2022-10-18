
window.addEventListener("load", function (e) {
    desktop.loadDataFromBase()
    listBookNow.addBook()
    }
)



class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.id = Date.now();
    }
}

class ListBooksNow{
    constructor() {
        this.booklist = []
    }

    addBook() {
        let form = document.querySelector("form")
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            let newTitle = form.elements.title.value
            let newAuthor = form.elements.author.value
            if (newTitle === "" || newAuthor === "") {
                alert("You try to add empty form")
            } else {
                let newBook = new Book(newTitle, newAuthor)
                this.booklist.push(newBook)
                this.addToBase()
                desktop.addBookToDesktop(newBook)
                desktop.clearForm()
            }
        })
    }
    addToBase() {
        base.saveBooks(this.booklist)
    }
}

let listBookNow = new ListBooksNow()

class Desktop {

    addBookToDesktop(book) {
        let bookList = listBookNow.booklist
        let body = document.querySelector("tbody")
        let newTr = document.createElement("tr")
        body.appendChild(newTr)
        let newTitle = document.createElement("td")
        newTitle.innerText = book.title
        newTr.appendChild(newTitle)
        let newAuthor = document.createElement("td")
        newAuthor.innerText = book.author
        newTr.appendChild(newAuthor)
        let buttonTd = document.createElement("td")
        newTr.appendChild(buttonTd)
        let buttonDelete = document.createElement("button")
        buttonTd.appendChild(buttonDelete)
        buttonDelete.innerText = "Delete"
        buttonDelete.className = " btn btn-danger delete brn-sm"
        buttonDelete.setAttribute("data-book-id", book.id)

        buttonDelete.addEventListener("click", (e) => {
            body.removeChild(newTr)
            bookList.forEach((element, index) => {
                if (element.id === book.id) {
                    bookList.splice(index, 1)
                }
            })
            listBookNow.addToBase()
        })


        let buttonUp = document.createElement("button")
        buttonTd.appendChild(buttonUp)
        buttonUp.className = "btn btn-secondary brn-sm down-arrow"
        buttonUp.innerText = "ᐃ"

        buttonUp.addEventListener("click", (e) => {
            for (let i=0; i < bookList.length; i++) {
            if (bookList[i].id === book.id) {
                if (i >= 1) {
                    let prev = bookList[i - 1]
                    bookList[i - 1] = bookList[i]
                    bookList[i] = prev
                    break
                }
            }
        }
            base.saveBooks(bookList)
            this.Refresh()
            this.loadDataFromBase()

        })

        let buttonDown = document.createElement("button")
        buttonTd.appendChild(buttonDown)
        buttonDown.className = "btn btn-secondary brn-sm down-arrow"
        buttonDown.innerText = "ᐁ"

        buttonDown.addEventListener("click", (e) => {
            for (let i=0; i < bookList.length; i++) {
            if (bookList[i].id === book.id) {
                if (i <= bookList.length - 2) {
                    let next = bookList[i + 1]
                    bookList[i + 1] = bookList[i]
                    bookList[i] = next
                    break
                }
            }
        }
            base.saveBooks(bookList)
            this.Refresh()
            this.loadDataFromBase()

        })
    }

    clearForm() {
        document.querySelector("#title").value = ""
        document.querySelector("#author").value = ""
    }

    loadDataFromBase() {
        let data = base.getBooks()
            listBookNow.booklist = data

            data.forEach((element, index) => {
                this.addBookToDesktop(element)
            })
    }
    Refresh() {
        let tr = document.querySelectorAll("tbody > tr")

        tr.forEach((element) => {
            element.parentElement.removeChild(element)
        })
    }
}

let desktop = new Desktop()


class Base {
    getBooks() {
        let books = null;

        if (localStorage.getItem("books") !== null || localStorage.getItem("books" !== undefined)) {
            books = JSON.parse(localStorage.getItem("books"));
        } else {
            books = [];
        }
        return books
    }

    saveBooks(books) {
        localStorage.setItem("books", JSON.stringify(books))
    }

}

const base = new Base()
