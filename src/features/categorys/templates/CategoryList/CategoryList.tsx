import { Button, createDisclosure, HStack, Icon, Modal } from '@hope-ui/core';
import { Link } from '@solidjs/router';
import { Text, useI18n } from 'solid-i18n';
import { Component, For, Show } from 'solid-js';
import IconPlus from '../../../../atoms/Icons/Stroke/IconPlus';
import { permissions } from '../../../../config/permissions';
import ButtonScrollUp from '../../../shared/molecules/ButtonScrollUp/ButtonScrollUp';
import GeneralLoader from '../../../shared/templates/GeneralLoader';
import { CategoryApi } from '../../interfaces';
import CategoryCard from '../../organisms/CategoryCard/CategoryCard';
import styles from '../../../user/templates/UserList/UserList.module.css';
import { darkDangerButton, darkPrimaryButton } from '../../../shared/constants/hopeAdapter';

interface CategoryListTemplateProps
{
    categoryList: CategoryApi[] | undefined;
    removeAction: any;
    loading: boolean;
    viewMoreAction: any;
    nextPage: string | undefined;
}

const CategoryList: Component<CategoryListTemplateProps> = ( props ) =>
{
    const i18n = useI18n();
    const { t } = i18n;

    const { isOpen, open, close } = createDisclosure();
    let deleteData: CategoryApi | undefined;

    const handleModalClick = () =>
    {
        props.removeAction( deleteData?.id );
        close();
    };

    const handleDelete = ( category: CategoryApi ) => () =>
    {
        deleteData = category;
        open();
    };

    return (
        <section class="section_container">
            <Modal isOpen={isOpen()} onClose={close}>
                <Modal.Overlay _dark={{ bgColor: 'rgba(0, 0, 0, 0.65)' }}/>
                <Modal.Content class={styles.modal_content} _dark={{ bgColor: 'neutral.800' }}>
                    <Modal.CloseButton clafilterss={styles.close_button}/>
                    <HStack>
                        <Modal.Heading class={'text-neutral-50 text-lg font-bold pb-3'}>
                            <Text message="a_delete_data"/>
                        </Modal.Heading>
                    </HStack>
                    <p class={'text-neutral-50'}><Text message="c_remove"/></p>
                    <h1 class={'text-neutral-50'}>{deleteData?.title}</h1>
                    <HStack class="modal_footer pt-4 justify-end">
                        <Button
                            onClick={close}
                            _dark={darkPrimaryButton}
                        >
                            <Text message="a_cancel"/>
                        </Button>
                        <Button
                            _dark={darkDangerButton}
                            colorScheme="danger"
                            onClick={handleModalClick}
                        >
                            <Text message="a_delete"/>
                        </Button>
                    </HStack>
                </Modal.Content>
            </Modal>

            <header class="section_header_container" data-parent={permissions.CAGETORY.SAVE}>
                <h1 class="section_title">
                    <Text message="c_list" />
                </h1>

                <div class="has-permission w-[100%] md:w-auto">
                    <Link href={'/category/create'}>
                        <Button
                            leftIcon={<Icon><IconPlus/></Icon>}
                            _dark={darkPrimaryButton}
                            class={'w-[100%] sm:w-[100%]'}
                        >
                            <Text message="c_create"/>
                        </Button>
                    </Link>
                </div>
            </header>


            <Show when={props.loading} keyed>
                <GeneralLoader/>
            </Show>

            <div class="grid_cards_container">
                <Show when={!props.loading || props.categoryList?.length} keyed>
                    <For each={props.categoryList} fallback={<span class={'text-neutral-50'}><Text message="No Categorys" /></span>}>
                        {( category ) =>
                            <CategoryCard category={category} onDelete={handleDelete( category )} /> 
                        }
                    </For>
                </Show>
            </div>

            <div class="section_bottom_buttons_container">
                <Show when={!!props.nextPage} keyed>
                    <Button onClick={props.viewMoreAction()} variant="outlined">
                        <Show when={!props.loading} fallback={<span class={'text-neutral-50'}><Text message="a_loading" />...</span>} keyed>
                            <Text message="a_view_more"/>
                        </Show>
                    </Button>
                </Show>

                <ButtonScrollUp dependencies={props.categoryList}/>
            </div>
        </section>
    );
};

export default CategoryList;
