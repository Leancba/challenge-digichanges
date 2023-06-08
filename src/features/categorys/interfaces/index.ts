import Base from '../../shared/interfaces/Base';
import { IBodyApi } from '../../shared/interfaces/response/IBodyApi';
import { IPaginatedBodyApi } from '../../shared/interfaces/response/IPaginatedBodyApi';

export interface Category
{
    title: string;
    enable: boolean;
}

export interface CategoryPayload
{
    title: string;
    enable: boolean;
}

export interface CategoryApi extends Category, Base {}

export type CategoryResponse = IBodyApi & {
    data: CategoryApi;
};

export type CategoryListResponse = IPaginatedBodyApi & {
    data: CategoryApi[];
};
