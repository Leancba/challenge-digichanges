    import { notificationService } from '../../features/shared/molecules/Toast/Toast';
    import { useI18n } from 'solid-i18n';
    import { Component, createEffect, createResource } from 'solid-js';
    import { useApplicationContext } from '../../context/context';
    import { CategoryApi, CategoryResponse } from '../../features/categorys/interfaces';
    import CategoryRepository from '../../features/categorys/repositories/CategoryRepository';
    import CategoryList from '../../features/categorys/templates/CategoryList/CategoryList';
    import { INIT_STATE } from '../../features/shared/constants';
    import createAlert from '../../features/shared/hooks/createAlert';
    import usePaginatedState from '../../features/shared/hooks/usePaginatedState';
    import usePermission from '../../features/shared/hooks/usePermission';
    import useQuery from '../../features/shared/hooks/useQuery';
    import PrivateLayout from '../../features/shared/layout/PrivateLayout/PrivateLayout';
    import AlertErrors from '../../features/shared/molecules/AlertErrors/AlertErrors';

    const IndexPage: Component = () =>
    {
        const { t } = useI18n();
        const { errorData, setError } = createAlert();

        const [ user ]: any = useApplicationContext();
        const categoryRepository = new CategoryRepository();

        const { page, goToPage, goFirstPage, getURLSearchParams } = useQuery( INIT_STATE.nextPaginationParams );

        const [ category, { refetch } ] = createResource( () => ( { user: user(), queryParams: getURLSearchParams() } ), () => categoryRepository.getCategorys() );
        const { resourceList: categoryList, setViewMore, paginationData } = usePaginatedState<CategoryApi, CategoryResponse>( category );

        usePermission( user, [ category ] );

        const viewMoreAction = () => () =>
        {
            goToPage( category()?.pagination?.nextUrl );
            setViewMore();
        };

        createEffect( () => category.error && setError( category.error ) );

        console.log(refetch())

        const removeAction = async ( id: string ) =>
        {
            try
            {
               
                void await categoryRepository.removeCategory( { id } );

                notificationService.show( {
                    status: 'success',
                    title: t( 'c_removed' ) as string,
                } );

                if ( page()?.offset === INIT_STATE.nextPaginationParams.offset )
                {
                 
                    refetch();
                }

                goFirstPage();
            }
            catch ( error )
            {
                const errorMessage = setError( error );
                notificationService.show( {
                    status: 'danger',
                    title: t( 'err_remove_category' ) as string,
                    description: t( errorMessage ) as string,
                } );
            }
        };

        return (
            <PrivateLayout>
                <AlertErrors
                    errorData={errorData()}
                    title="err"
                    description="err_remove_category"
                />
                <CategoryList
                    categoryList={categoryList()}
                    removeAction={removeAction}
                    loading={category.loading}
                    viewMoreAction={viewMoreAction}
                    nextPage={paginationData()?.nextUrl}
                />
            </PrivateLayout>
        );
    };

    export default IndexPage;
