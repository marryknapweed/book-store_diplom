export interface Book {
  title: string;
  subtitle?: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
}

export interface FetchBooksResponse {
  total: string;
  page: string;
  books: Book[];
}
export interface BookDetailProps extends Book {
  authors: string;
  publisher: string;
  isbn10: string;
  pages: number;
  year: string;
  rating: number;
  desc: string;
  pdf?: Record<string, string>;
  language: string,
  format: string
}

export interface BooksState {
  list: Book[];
  isLoading: boolean;
  error: string | null;
  pagesCount: number;
  limit: number;
}

export interface CardBookProps {
  title: string
  subtitle?: string
  image: string
  price: number | string
  isbn13: string
}

export interface NewBooksListProps {
  books: Book[];
}

export interface BookItemState {
  list: BookDetailProps | null;
  isLoading: boolean;
  error: string | null;
  activeTab: BookDetailProps | null
  favorites: BookDetailProps[];
}
