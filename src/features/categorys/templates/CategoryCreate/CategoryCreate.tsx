import { notificationService } from '../../../shared/molecules/Toast/Toast';
import { useNavigate } from '@solidjs/router';
import { Text, useI18n } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import { PermissionApi } from '../../../auth/interfaces/permission';
import createAlert from '../../../shared/hooks/createAlert';
import AlertErrors from '../../../shared/molecules/AlertErrors/AlertErrors';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { CategoryPayload, CategoryResponse } from '../../interfaces';
import CategoryForm from '../../organisms/CategoryForm/CategoryForm';

interface CategoryCreateTemplateProps {
    permissionsList?: PermissionApi[];
    onCreate: ( data: CategoryPayload ) => Promise<CategoryResponse>;
    loading: boolean;
}

const CategoryCreate: Component<CategoryCreateTemplateProps> = props =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'c_created' ) as string,
        } );
        navigate( '/category/list', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_save_role' ) as string,
            description: t( errorMessage ) as string,
        } );
    } ;

    return (
        <section class="section_container">

            <AlertErrors
                errorData={errorAlert.errorData()}
                title="err_save"
                description="err_save_role"
            />

            <header class="section_header_container">
                <h1 class="section_title"><Text message="c_create" /></h1>
            </header>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>}>
                <CategoryForm
                    onError={handleError()}
                    onSubmit={props.onCreate}
                    onSuccess={handleSuccess()}
                />
            </Show>

        </section>
    );
};

export default CategoryCreate;
