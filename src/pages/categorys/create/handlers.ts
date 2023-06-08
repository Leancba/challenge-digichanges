import { RolePayload } from '../../../features/role/interfaces';
import { CategoryPayload } from '../../../features/categorys/interfaces';
import CategoryRepository from '../../../features/categorys/repositories/CategoryRepository';


type params = {
    categoryRepository: CategoryRepository;
};

export const createAction = ( { categoryRepository }: params ) => async ( data: CategoryPayload ) =>
{
    return categoryRepository.createCategory( { data } );
};
