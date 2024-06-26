export interface Book {
  title: string;
  subtitle?: string;
  isbn13: string;
  price: string;
  image: string;
  url: string;
  authors: string[];
}

export interface BookDetailProps extends Book {
  publisher: string;
  isbn10: string;
  pages: number;
  year: string;
  rating: number;
  desc: string;
  pdf?: Record<string, string>;
  language: string,
  format: string
  quantity?: number;
}

export interface BooksState {
  list: Book[];
  isLoading: boolean;
  error: string | null;
  pagesCount: number;
}

export interface CardBookProps {
  title: string
  subtitle?: string
  image: string
  price: number | string
  isbn13: string
  quantity?: number;
}

export interface BookItemState {
  list: BookDetailProps | null;
  isLoading: boolean;
  error: string | null;
  activeTab: string | null
}

export interface CartSummaryProps {
  sumTotal: number;
  VAT: number;
  total: number;
}
