import { Injectable } from '@nestjs/common';

import { Product } from '../entities/product.entity';
import { log } from 'console';

@Injectable()
export class ProductsService {
  private counterId = 1;

  private products: Product[] = [
    {
      id: 1,
      name: 'Producto 1',
      description: 'Descripcion 1',
      price: 123,
      stock: 12,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id) {
    return this.products.find((item) => item.id === id);
  }

  create(payload: any) {
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: any) {
    const product = this.findOne(id);

    if (product) {
      const index = this.products.findIndex((item) => item.id === id);
      this.products[index] = { ...product, ...payload };
      return this.products[index];
    }
    return null;
  }

  delete(id) {
    // const product = this.findOne();

    // const index = this.products.indexOf(
    //   this.products.find((item) => item.id === id),
    // );

    const index = this.products.findIndex((item) => item.id === id);
    

    this.products.splice(index, 1);
    return this.products;
  }
}
