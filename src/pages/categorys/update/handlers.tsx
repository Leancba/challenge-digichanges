import { CategoryPayload } from '../../../features/categorys/interfaces';
import CategoryRepository from '../../../features/categorys/repositories/CategoryRepository';
import { LoginApi } from '../../../features/auth/interfaces/login';

type params = {
    categoryRepository: CategoryRepository;
    id: string;
    user: LoginApi;
};

export const updateAction = ( { categoryRepository, id, user }: params ) => async ( data: CategoryPayload ) =>
{
    return categoryRepository.updateCategory( { id, data, user } );
};
