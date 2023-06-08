import { Component, createEffect, createResource } from 'solid-js';
import { useApplicationContext } from '../../context/context';
import { INIT_STATE } from '../../features/shared/constants';
import usePaginatedState from '../../features/shared/hooks/usePaginatedState';
import useQuery from '../../features/shared/hooks/useQuery';
import UserRepository from '../../features/products/repositories/ProductsRepository';
import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';
import usePermission from '../../features/shared/hooks/usePermission';
import { deleteProduct } from './delete/handlers';
import createAlert from '../../features/shared/hooks/createAlert';
import AlertErrors from '../../features/shared/molecules/AlertErrors/AlertErrors';
import { useI18n } from 'solid-i18n';
import { ProductApi, ProductListResponse } from '../../features/products/interfaces';
import UserList from '../../features/products/templates/ProductList/ProductList';
import ProductRepository from '../../features/products/repositories/ProductsRepository';

const IndexPage: Component = () =>
{
    const { t } = useI18n();
    const { errorData, setError } = createAlert();
    const [ user ]: any = useApplicationContext();
    const productRepository = new ProductRepository();

    const { goToPage, getURLSearchParams } = useQuery( INIT_STATE.nextPaginationParams );

    const [ product, { refetch } ] = createResource( () => ( { user: user(), queryParams: getURLSearchParams() } ), () => productRepository.getUsers() );

    const { resourceList: userList, setViewMore, paginationData } = usePaginatedState<ProductApi, ProductListResponse>( product );

    usePermission( user, [ product ] );

    createEffect( () => product.error && setError( product.error ) );

    const viewMoreAction = () =>
    {
        goToPage( product()?.pagination?.nextUrl );
        setViewMore();
    };

    return (
        <PrivateLayout>
            <AlertErrors
                errorData={errorData}
                title="err"
                description="err_process_user"
            />
            <UserList
                userList={userList()}
                removeAction={deleteProduct( { productRepository, setError, refetch, t } )}
                loading={product.loading}
                viewMoreAction={() => viewMoreAction}
                nextPage={paginationData()?.nextUrl}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
