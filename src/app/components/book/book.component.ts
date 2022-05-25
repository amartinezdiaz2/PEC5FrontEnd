import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, OnInit } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/models/book.interface';
import { Node } from 'src/app/models/node.interface';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  book: Book = {
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
  show: Boolean = false;

  treeControl = new NestedTreeControl<Node>(node => node.children);
  dataSource = new MatTreeNestedDataSource<Node>();

  constructor(
    private booksService: BooksService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const identifier = this.activatedRoute.snapshot.paramMap.get('id');

    if(identifier){
      this.booksService.getBookById(identifier).subscribe(
        (book) => {
          if(!book){
            return this.router.navigateByUrl('/')
          }
          let children: Node[] = [];
          this.book = this.saveBook(book);
          this.book.id = book.id;

          for(let i = 0; i < this.book.categories.length; i ++){
            children.push({name: this.book.categories[i]})
          }

          this.dataSource.data = [{
            name: 'Categories',
            children: children
          }]
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  hasChild = (_: number, node: Node) => !!node.children && node.children.length > 0;

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
