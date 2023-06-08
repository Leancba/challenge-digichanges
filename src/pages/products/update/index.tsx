import { useParams } from '@solidjs/router';
import { Component, createMemo, createResource } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import usePermission from '../../../features/shared/hooks/usePermission';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import ProductRepository from '../../../features/products/repositories/ProductsRepository';
import ProductUpdate from '../../../features/products/templates/ProductUpdate/ProductUpdate';
import CategoryRepository from '../../../features/categorys/repositories/CategoryRepository';
import { updateAction } from './handlers';

const IndexPage: Component = () =>
{
    const { id } = useParams<{ id: string }> ();
    const [ user ]: any = useApplicationContext();
    const authRepository = new AuthRepository();
    const roleRepository = new RoleRepository();
    const productRepository = new ProductRepository();
    const categoryRepository = new CategoryRepository()

    const [ categorys ] = createResource( categoryRepository.getCategorys );
    const [ productSelected ] = createResource( { id, user: user() }, productRepository.getOne );
    const [ roles ] = createResource( { user: user() }, roleRepository.getRoles );
    const [ permissions ] = createResource( { user: user() }, authRepository.getAllPermissions );
    usePermission( user, [ roles, permissions, productSelected ] );

    const isLoading = createMemo( () => productSelected.loading || permissions.loading || roles.loading || categorys.loading );

    
    console.log(categorys()?.data)



    return (
        <PrivateLayout>
            <ProductUpdate
                onUpdate={updateAction( { productRepository, id } )}
                productSelected={productSelected()?.data}
                categoryList={categorys()?.data}
                rolesList={roles()?.data}
                loading={isLoading()}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
