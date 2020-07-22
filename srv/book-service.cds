using {bookshop as bookshop} from '../db/schema';

service BookshopService @(path : '/browse') {
  entity Books as projection on bookshop.Books
}
