export interface Book {
    id: string;
    title: string;
    authors: string[];
    publisher: string;
    publishedDate: Date;
    description: string;
    readingModes: {text: boolean, image: boolean};
    pageCount: number;
    categories: string[];
    imageLinks: {smallThumbnail: string, thumbnail: string};
    language: string;
}