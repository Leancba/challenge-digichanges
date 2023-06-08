import { notificationService } from '../../../shared/molecules/Toast/Toast';
import { useNavigate } from '@solidjs/router';
import { Text, useI18n } from 'solid-i18n';
import { Component, Show } from 'solid-js';
import { permissions } from '../../../../config/permissions';
import { PermissionApi } from '../../../auth/interfaces/permission';
import { RoleApi } from '../../../role/interfaces';
import { CategoryApi } from '../../../categorys/interfaces';
import createAlert from '../../../shared/hooks/createAlert';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { ProductPayload } from '../../interfaces';
import ProductForm from '../../organisms/ProductsForm/ProductsForm';


interface ProductCreateTemplateProps {
    permissionsList?: PermissionApi[];
    categoryList?: CategoryApi[];
    rolesList?: RoleApi[];
    onCreate: ( data: ProductPayload ) => Promise<void>;
    loading: boolean;
}

const ProductCreate: Component<ProductCreateTemplateProps> = props =>
{
    const { t } = useI18n();
    const navigate = useNavigate();
    const errorAlert = createAlert();
    const { setError } = errorAlert;

    const handleSuccess = () => () =>
    {
        notificationService.show( {
            status: 'success',
            title: t( 'p_created' ) as string,
        } );
        navigate( '/products/list', { replace: true } );
    };

    const handleError = () => ( error: unknown ) =>
    {
        const errorMessage = setError( error );
        notificationService.show( {
            status: 'danger',
            title: t( 'err_save_product' ) as string,
            description: t( errorMessage ) as string,
        } );
    } ;

    return (
        <section class="section_container">

            <header class="section_header_container">
                <h1 class="section_title"><Text message="p_create" /></h1>
            </header>

            <Show when={!props.loading} fallback={() => <GeneralLoader/>} keyed>
                <ProductForm
                    onError={handleError()}
                    onSubmit={props.onCreate}
                    onSuccess={handleSuccess()}
                    requiredPermission={{ submit: permissions.PRODUCT.SAVE }}
                    categoryList={props.categoryList}
                />
            </Show>

        </section>
    );
};

export default ProductCreate;
