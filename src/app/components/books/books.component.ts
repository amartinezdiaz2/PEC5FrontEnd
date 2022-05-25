import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book.interface';
import { BooksService } from 'src/app/services/books.service';
import { animate, style, transition, trigger } from '@angular/animations';

export const fadeAnimation = trigger('fadeAnimation', [
  transition(':enter', [
    style({ opacity: 0 }), animate('600ms', style({ opacity: 1 }))]
  ),
  transition(':leave',
    [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))]
  )
]);

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
  animations: [
    fadeAnimation
  ]
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  spinner: Boolean = true;

  constructor(private booksService: BooksService) { }

  ngOnInit(): void {
    this.booksService.getAllBooks().subscribe(
      (books) => {
        books.items.forEach((book: { id: string, volumeInfo: any; }) => {
          let newBook: Book = this.saveBook(book);
          newBook.id = book.id;
          this.books.push(newBook);
        });
        this.spinner = false;
      }
    )
  }

  saveBook(book: any): Book {
    let newBook: Book = {
      id:'', 
      title:'', 
      authors:[], 
      publisher:'', 
      publishedDate: new Date(), 
      description:'', 
      readingModes:{text: false, image: false}, 
      pageCount:0, 
      categories:[], 
      imageLinks:{smallThumbnail: '', thumbnail: ''}, 
      language:''
    };
    if(book.volumeInfo.title !== undefined){
      newBook.title = book.volumeInfo.title;
    }
    if(book.volumeInfo.authors !== undefined){
      newBook.authors = book.volumeInfo.authors;
    }
    if(book.volumeInfo.publisher !== undefined){
      newBook.publisher = book.volumeInfo.publisher;
    }
    if(book.volumeInfo.publishedDate !== undefined){
      newBook.publishedDate = book.volumeInfo.publishedDate;
    }
    if(book.volumeInfo.description !== undefined){
      newBook.description = book.volumeInfo.description;
    }
    if(book.volumeInfo.readingModes !== undefined){
      newBook.readingModes = book.volumeInfo.readingModes;
    }
    if(book.volumeInfo.pageCount !== undefined){
      newBook.pageCount = book.volumeInfo.pageCount;
    }
    if(book.volumeInfo.categories !== undefined){
      newBook.categories = book.volumeInfo.categories;
    }
    if(book.volumeInfo.imageLinks !== undefined){
      newBook.imageLinks = book.volumeInfo.imageLinks;
    }
    if(book.volumeInfo.language !== undefined){
      switch(book.volumeInfo.language){
        case 'en':
          newBook.language = 'English';
          break;
        case 'es':
          newBook.language = 'Espanish';
          break;
        default:
          newBook.language = book.volumeInfo.language;
      }
    }
    return newBook;
  }

}
