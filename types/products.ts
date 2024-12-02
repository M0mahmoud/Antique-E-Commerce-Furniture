export type ProductProps = {
    product: Product;
    index: number;
};

export type ProductStatus = "new" | "sale";

export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    originalPrice?: number;
    image: string;
    status?: ProductStatus;
}
