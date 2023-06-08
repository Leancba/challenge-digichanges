import ProductRepository from '../../../features/products/repositories/ProductsRepository';
import { ProductPayload } from '../../../features/products/interfaces';

type params = {
    productRepository: ProductRepository;
    id: string;
};

export const updateAction = ( { productRepository, id }: params ) => async ( data: ProductPayload ) =>
{
    return productRepository.updateUser( { id, data } );
};
