import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';
import { IPaginatedBodyApi } from '../../shared/interfaces/response/IPaginatedBodyApi';
import Base from '../../shared/interfaces/Base';

export interface Product {
    title: string;
    price: number;
    category: string;
    enable: boolean;
}

export type ProductPayload =
{
    title: string;
    price: number;
    category: string[];
    enable: boolean;
};

export interface ProductApi extends Product, Base {
    [key: string]: any;
  }

export type ProductResponse = IBodyApi & {
    data: ProductApi;
};

export type ProductListResponse = IPaginatedBodyApi & {
    data: ProductApi[];
};
