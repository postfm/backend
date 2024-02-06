export interface ProductInterface {
  id?: string;
  name: string;
  description: string;
  photo: string;
  type: string;
  article: string;
  strings: number;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}
