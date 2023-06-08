import { AxiosRequestConfig } from 'axios';
import { ProductPayload, ProductListResponse, ProductResponse } from '../interfaces';
import { config } from '../../shared/repositories/config';
import HttpService from '../../../services/HttpService';
import PayloadProps from '../../shared/interfaces/PayloadProps';

const { baseUrl } = config.apiGateway.server;
const { getAll, remove, update, create, getOne } = config.apiGateway.routes.products;

class ProductRepository
{
    public getUsers ()
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${getAll}`,
        };

        return HttpService.request<ProductListResponse>( { config } );
    }

    public getOne ( { id }: PayloadProps )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${getOne}/${id}`,
        };

        return HttpService.request<ProductResponse>( { config } );
    }


    public updateUser ( { id, data }: PayloadProps<ProductPayload> )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${update}/${id}`,
            method: 'PUT',
            data,
        };

        return HttpService.request<ProductResponse>( { config } );
    }

    public createProduct ( { data }: PayloadProps<ProductPayload> )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${create}`,
            method: 'POST',
            data,
        };

        return HttpService.request<ProductResponse>( { config } );
    }

    public deleteProduct ( { id }: PayloadProps<ProductPayload> )
    {
        const config: AxiosRequestConfig = {
            url: `${baseUrl}/${remove}/${id}`,
            method: 'DELETE',
        };

        return HttpService.request<ProductResponse>( { config } );
    }

}

export default ProductRepository;
