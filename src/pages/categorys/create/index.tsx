import { Component, createResource } from 'solid-js';
import { useApplicationContext } from '../../../context/context';
import AuthRepository from '../../../features/auth/repositories/AuthRepository';
import CategoryRepository from '../../../features/categorys/repositories/CategoryRepository';
import CategoryCreate from '../../../features/categorys/templates/CategoryCreate/CategoryCreate';
import usePermission from '../../../features/shared/hooks/usePermission';
import PrivateLayout from '../../../features/shared/layout/PrivateLayout/PrivateLayout';
import { createAction } from './handlers';

const IndexPage: Component = () =>
{
    const [ user ]: any = useApplicationContext();
    const categoryRepository = new CategoryRepository();
    const authRepository = new AuthRepository();
    const [ permissions ] = createResource( { user: user() }, authRepository.getAllPermissions );

    usePermission( user, [ permissions ] );

    return (
        <PrivateLayout>
            <CategoryCreate
                onCreate={createAction( { categoryRepository } )}
                permissionsList={permissions()?.data}
                loading={permissions.loading}
            />
        </PrivateLayout>
    );
};

export default IndexPage;
