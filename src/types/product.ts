export interface Product {
    id: number;
    title: string;
    price: number;
    thumbnail: string;
    description: string;
}

export interface ProductsApiResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
}
