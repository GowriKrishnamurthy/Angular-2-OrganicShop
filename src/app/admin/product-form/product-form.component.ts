import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../shared/services/category.service';
import { Form } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take';
import { ProductService } from '../../shared/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  // Observable to get the categories from Firebase Db
  categories$;
  currentProduct: any = {};
  id;

  constructor(categoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

    this.categories$ = categoryService.getCategories();

    // Get current product from active route:
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // Take 1 will get only the very first matching product ID
    // and the subscription gets closed automatically
    // no need to implement destroy as we 've used take(1)
    if (this.id) {
      this.productService.getProductById(this.id).valueChanges()
        .take(1).subscribe(p => this.currentProduct = p);
    }
  }

  onSave(product) {
    // If productID has some value, update. otherwise create new product 
    if (!this.id)
      this.productService.createProduct(product);
    else
      this.productService.updateProduct(this.id, product);

    this.router.navigate(['/admin/products']);
  }

  onDelete() {
    // Do nothing when no confirmation from user on deleting this product 
    if (!confirm('Are you sure you want to delete this product?'))
      return;

    // Delete the selected product and navigate back to main products page 
    this.productService.deleteProduct(this.id);
    this.router.navigate(['/admin/products']);
  }

  onCancel(){
    this.router.navigate(['/admin/products']);
  }
  ngOnInit() {
  }

}
