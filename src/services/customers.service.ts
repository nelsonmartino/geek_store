import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto, UpdateCustomerDto } from 'src/dtos/customers.dto';
import { Customer } from 'src/entities/customer.entity';

@Injectable()
export class CustomersService {
  private counterId = 1;

  private customers: Customer[] = [
    {
      id: 1,
      name: 'Juan Perez',
      email: 'jperez@mail.com',
      address: 'Rivadavia 2200 CABA',
      paymentMethod: 'Debit',
    },
  ];

  findAll() {
    return this.customers;
  }

  findOne(id: number) {
    const customer = this.customers.find((item) => item.id === id);
    if (!customer) throw new NotFoundException(`Customer id:${id} not found`);
    return customer;
  }

  createCustomer(payload: CreateCustomerDto) {
    this.counterId += 1;
    const newCustomer = {
      id: this.counterId,
      ...payload,
    };
    this.customers.push(newCustomer);
    return newCustomer;
  }

  updateCustomer(id: number, payload: UpdateCustomerDto) {
    const customer = this.findOne(id);
    const index = this.customers.findIndex((item) => item.id === id);
    this.customers[index] = { ...customer, ...payload };
    return this.customers[index];
  }

  deleteCustomer(id: number) {
    const index = this.customers.findIndex((item) => item.id === id);
    if (index < 0) throw new NotFoundException(`Customer #${id} not found`);
    this.customers.splice(index, 1);
    return this.customers;
  }
}
