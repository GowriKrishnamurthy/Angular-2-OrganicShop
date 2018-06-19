import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }
  
  createProduct(product)
  {
    this.db.list('/products').push(product);
  }

  getAllProducts()
  {
    // Get all products from the firebase Db
    return this.db.list('/products').snapshotChanges();
  }
}
