import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this.http.get('https://www.googleapis.com/books/v1/volumes?q=+inauthor:Rosa+inauthor:Montero&maxResults=30');
  }

  getBookById(bookId: string): Observable<any> {
    return this.http.get('https://www.googleapis.com/books/v1/volumes/' + bookId);
  }
}
