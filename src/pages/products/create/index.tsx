import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import RoleRepository from '../../../features/role/repositories/RoleRepository';
import usePermission from '../../../features/shared/hooks/usePermission';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import ProductRepository from '../../../features/products/repositories/ProductsRepository';
import UserCreate from '../../../features/products/templates/ProductCreate/UserCreate';
import CategoryRepository from '../../../features/categorys/repositories/CategoryRepository';
import { createAction } from './handler';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const authRepository = new AuthRepository();
    const productRepository = new ProductRepository();
    const roleRepository = new RoleRepository();
    const categoryRepository = new CategoryRepository()

    const [ roles ] = createResource( { user: user() }, roleRepository.getRoles );
    const [ permissions ] = createResource( { user: user() }, authRepository.getAllPermissions );
    const [ categorys ] = createResource( categoryRepository.getCategorys );
    usePermission( user, [ roles, permissions ] );

   

    return (
        <PrivateLayout>
            <UserCreate
                onCreate={createAction( { productRepository } )}
                permissionsList={permissions()?.data}
                categoryList={categorys()?.data}
                rolesList={roles()?.data}
                loading={permissions.loading || roles.loading || categorys.loading }
            />
        </PrivateLayout>
    );
};

export default IndexPage;
