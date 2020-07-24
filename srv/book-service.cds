using {bookshop as bookshop} from '../db/schema';

service BookshopService @(path : '/browse') {
  entity Books as projection on bookshop.Books

  @cds.persistence.skip
  entity Test {
    key id : String
  }
}
