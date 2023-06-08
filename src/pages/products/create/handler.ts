import { ProductPayload } from '../../../features/products/interfaces';
import ProductRepository from '../../../features/products/repositories/ProductsRepository';


type params = {

    productRepository: ProductRepository;
    
};

export const createAction = ( { productRepository }: params ) => async ( data: ProductPayload ) =>
{
    return productRepository.createProduct( { data } );
};
