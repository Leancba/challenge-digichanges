import { notificationService } from '../../../shared/molecules/Toast/Toast';
import { useNavigate } from '@solidjs/router';
import { Text, useI18n } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import { permissions } from '../../../../config/permissions';
import { PermissionApi } from '../../../auth/interfaces/permission';
import createAlert from '../../../shared/hooks/createAlert';
import AlertErrors from '../../../shared/molecules/AlertErrors/AlertErrors';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { CategoryApi, CategoryPayload, CategoryResponse } from '../../interfaces';
import CategoryForm from '../../organisms/CategoryForm/CategoryForm';


interface RoleUpdateTemplateProps
{
    permissionsList?: PermissionApi[];
    onUpdate: ( data: CategoryPayload ) => Promise<CategoryResponse>;
    roleSelected: CategoryApi | undefined;
    loading: boolean;
}

const CategoryUpdate: Component<RoleUpdateTemplateProps> = ( props ) =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'c_updated' ) as string,
        } );
        navigate( '/category/list', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_save_category' ) as string,
            description: t( errorMessage ) as string,
        } );
    } ;

    return (
        <section class="section_container">

            <AlertErrors
                errorData={errorAlert.errorData()}
                title="err_save"
                description="err_save_category"
            />

            <header class="section_header_container" data-parent={permissions.ROLES.UPDATE}>
                <div class="has-permission">
                    <h1 class="section_title"><Text message="c_update"/></h1>
                </div>
                <div class="fallback">
                    <h1 class="section_title"><Text message="c_update" /></h1>
                </div>
            </header>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>} keyed>
                <CategoryForm
                    onError={handleError()}
                    onSubmit={props.onUpdate}
                    onSuccess={handleSuccess()}
                    roleSelected={props.roleSelected}
                />
            </Show>
        </section>
    );
};
export default CategoryUpdate;
