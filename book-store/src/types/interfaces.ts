export interface Book {
  title: string;
  subtitle?: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

// export interface FetchBooksResponse {
//   books: Book[];
// }

export interface FetchBooksResponse {
  total: string;
  page: string;
  books: Book[];
}

export interface BooksState {
  list: Book[];
  isLoading: boolean;
  error: string | null;
}

export interface CardBookProps {
  title: string
  subtitle: string
  image: string
  price: number | string
}

export interface NewBooksListProps {
  books: Book[];
}
