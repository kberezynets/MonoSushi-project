import { ICategoryResponse } from "../category/category.interface";

export interface IProductRequest {
    category: ICategoryResponse;
    name: string;
    path: string;
    ingridients: string;
    weight: number;
    price: number;
    imagePath: string;
    count: number;
}

export interface IProductResponse extends IProductRequest {
    id: number;
}