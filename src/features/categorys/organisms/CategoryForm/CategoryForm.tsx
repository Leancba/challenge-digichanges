import { createForm } from '@felte/solid';
import { validator } from '@felte/validator-yup';
import { Button, FormControl, FormControlError, FormControlLabel, Input } from '@hope-ui/core';
import { useNavigate} from '@solidjs/router';
import { Text, useI18n } from 'solid-i18n';
import { Component, onMount, Show } from 'solid-js';
import { InferType } from 'yup';
import { CategoryApi, CategoryPayload, CategoryResponse } from '../../interfaces';
import CategorySchema from '../../validations/schemas/CategorySchema';
import Switch from '../../../shared/molecules/Switch/Switch';
import { darkInput, darkNeutralButton, darkPrimaryButtonWithBackground, placeholderInput } from '../../../shared/constants/hopeAdapter';
import { permissions } from '../../../../config/permissions';


interface CategoryUpdateTemplateProps
{
    onError: ( error: unknown ) => void;
    onSubmit: ( data: CategoryPayload ) => Promise<CategoryResponse>;
    onSuccess: () => void;
    categorySelected?: CategoryApi | undefined;
    
}

const CategoryForm: Component<CategoryUpdateTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;
    const navigate = useNavigate();

    const {
        data,
        errors,
        form,
        isSubmitting,
        isValid,
        setFields,
        // @ts-ignore
    } = createForm<InferType<typeof CategorySchema>>( {
        initialValues: {
            title: '',
            enable: true,
        },
        extend: validator( { schema: CategorySchema } ),
        onSuccess: props.onSuccess,
        onError: props.onError,
        onSubmit: values => props.onSubmit( values as CategoryPayload ),
    } );

    const handleSelect = ( field: keyof InferType<typeof CategorySchema> ) => ( value: string[] | boolean ) =>
    {
        setFields( field, value, true );
    };



    onMount( () =>
    {
        if ( props.categorySelected )
        {
            for ( const key in props.categorySelected )
            {
                // @ts-ignore
                setFields( key, props.categorySelected[key] );
            }
        }
    } );


    return (
        <form ref={form} class="form_flex">
            <div class="field_wrapper">
                <FormControl isRequired isInvalid={ !!errors( 'title' ) } >
                    <FormControlLabel class={'form_label'} for="title" _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="title"/>
                    </FormControlLabel>
                    <Input
                        _dark={darkInput}
                        _placeholder={placeholderInput}
                        autofocus
                        name="title"
                        type="text"
                        placeholder={t( 'a_enter_title' ) as string}
                        value={props.categorySelected?.title}
                    />
                    <Show when={errors( 'title' )} keyed>
                        <FormControlError class="error_message_block">
                            <Text message={errors( 'title' )?.[0] ?? ''} />
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>  
            <div class="field_wrapper">
                <FormControl isRequired isInvalid={!!errors( 'enable' )}>
                    <FormControlLabel class={'form_label'} _dark={{ _after: { color: 'danger.300' } }}>
                        <Text message="enable"/>
                    </FormControlLabel>
                    <Switch
                        name={'enable'}
                        value={data().enable}
                        onChange={handleSelect( 'enable' )}
                    />
                    <Show when={errors( 'enable' )} keyed>
                        <FormControlError class="error_message_block">
                            <Text message={errors( 'enable' )?.[0] ?? ''}/>
                        </FormControlError>
                    </Show>
                </FormControl>
            </div>

            <div class="update_save_buttons_container" data-parent={permissions.CAGETORY.UPDATE}>
                <div class="button_full has-permission">
                    <Button
                        _dark={darkNeutralButton}
                        class="button_full"
                        onClick={()=>navigate('/category/list')}
                        colorScheme="neutral"
                    >
                        <Text message="a_back" />
                    </Button>
                </div>
                <div class="button_full has-permission ">
                    <Button
                        _dark={darkPrimaryButtonWithBackground}
                        class="button_full"
                        type="submit"
                        isDisabled={!isValid()}
                        isLoading={isSubmitting()}
                        loadingText={<Text message="a_submitting"/> as string}
                    >
                        <Text message="a_save"/>
                    </Button>
                </div>
                <div class="button_full fallback">
                    <Button
                        _dark={darkNeutralButton}
                        class="w-full"
                        onClick={()=>navigate('/category/list')}
                    >
                        <Text message="a_back" />
                    </Button>
                </div>
            </div>

        </form>
    );
};
export default CategoryForm;
