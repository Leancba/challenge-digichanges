import { notificationService } from '../../../features/shared/molecules/Toast/Toast';
import ProductRepository from '../../../features/products/repositories/ProductsRepository';
import { ProductApi } from '../../../features/products/interfaces';


type params = {
    productRepository: ProductRepository;
    product: ProductApi;
    setError: ( error: undefined ) => string;
    refetch: ( info?: unknown ) => void;
    t: any;
};

export const deleteProduct = ( { productRepository, setError, refetch, t }: params ) => async ( id: string ) =>
{
    try
    {
        void await productRepository.deleteProduct( { id } );

        notificationService.show( {
            status: 'success',
            title: t( 'u_removed' ) as string,
        } );

        refetch();
    }
    catch ( error: any )
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_remove_user' ) as string,
            description: t( errorMessage ) as string,
        } );
    }
};
