import { createForm } from "@felte/solid";
import { validator } from "@felte/validator-yup";
import {
  Button,
  FormControl,
  FormControlError,
  FormControlLabel,
  Input,
} from "@hope-ui/core";
import { useNavigate } from "@solidjs/router";
import { Text, useI18n } from "solid-i18n";
import { Component, onMount, Show } from "solid-js";
import { InferType } from "yup";
import { PermissionApi } from "../../../auth/interfaces/permission";
import { CategoryApi } from "../../../categorys/interfaces";
import { RoleApi } from "../../../role/interfaces";
import { ProductApi, ProductPayload } from "../../interfaces";
import productsSchema from "../../validations/schemas/productsValidationSchema";
import { MultiSelect, Select } from "../../../shared/molecules/Select/Select";
import Switch from "../../../shared/molecules/Switch/Switch";
import { createSignal } from "solid-js";
import {
  darkInput,
  darkNeutralButton,
  darkPrimaryButtonWithBackground,
  placeholderInput,
} from "../../../shared/constants/hopeAdapter";

enum RequiredPermission {
  submit = "submit",
}

interface ProductUpdateTemplateProps {
  onError: (error: unknown) => void;
  onSubmit: (data: ProductPayload) => Promise<void>;
  onSuccess: () => void;
  productSelected?: ProductApi | undefined;
  requiredPermission: Record<RequiredPermission, string>;
  categoryList?: CategoryApi[];
}

const ProductForm: Component<ProductUpdateTemplateProps> = (props) => {
  
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
  } = createForm<InferType<typeof productsSchema>>({
    initialValues: {
      title: "",
      price: 0,
      enable: true,
      category: [],
    },
    extend: validator({ schema: productsSchema }),
    onSuccess: props.onSuccess,
    onError: props.onError,
    onSubmit: (values) => props.onSubmit(values as ProductPayload),
  });

  const handleSelect =
    (field: keyof InferType<typeof productsSchema>) =>
    (value: string[] | boolean) => {
      setFields(field, value, true);
    };

    const handleMultiSelect = (field: keyof InferType<typeof productsSchema>) => (
      value: any
    ) => {
      const valuesArray: string[] = Array.from(value);
      setFields(field, valuesArray, true);
    };

  
    onMount( () =>
    {
        if ( props.productSelected )
        {
            for ( const key in props.productSelected )
            
            {

                {
                    // @ts-ignore
                    
                    setFields( key, props.productSelected[key] );
                }
            }
        }
    } );

    
    //filtro las categorias en el selector que tengan las propiedad enable = true
  const filteredCategories = props.categoryList?.filter((category) => category.enable);
   //transformo la propiedad title en un string para comparar con las categorias del producto
   // por que este las almacena como string
  const CategoryStrings = filteredCategories?.map((category) => category.title);

  //creo el objeto concatenando los objetos anteriores para asi obtener el options del selector
  const mergedArray = CategoryStrings?.concat(props.productSelected?.category ?? []);

  //filtro las categorias que sean iguales tanto en la propiedad del objeto como en el selector
  //por que al utilizarse como el option del multiselect se van a repetir si el objeto ya las tiene
  //cargadas como propiedad y si en la base tambien existe

  const uniqueArray = mergedArray?.filter((value, index, self) => {
    return self.indexOf(value) === index;
  });
  

  return (
    <form ref={form} class="form_flex">
      <h2 class="section_title_opaque border_bottom">
        <Text message="a_products_information" />
      </h2>

      <div class="field_wrapper">
        <FormControl isRequired isInvalid={!!errors("title")}>
          <FormControlLabel
            class={"form_label"}
            for="title"
            _dark={{ _after: { color: "danger.300" } }}
          >
            <Text message="title" />
          </FormControlLabel>
          <Input
            _dark={darkInput}
            _placeholder={placeholderInput}
            name="title"
            type="text"
            placeholder={t("a_enter_product_title") as string}
            value={props.productSelected?.title}
          />
          <Show when={errors("title")} keyed>
            <FormControlError class="error_message_block">
              <Text message={errors("title")?.[0] ?? ""} />
            </FormControlError>
          </Show>
        </FormControl>
      </div>

      <div class="field_wrapper">
        <FormControl isRequired isInvalid={!!errors("price")}>
          <FormControlLabel
            class={"form_label"}
            for="price"
            _dark={{ _after: { color: "danger.300" } }}
          >
            <Text message="price" />
          </FormControlLabel>
          <Input
            _dark={darkInput}
            _placeholder={placeholderInput}
            autofocus
            name="price"
            type="number"
            placeholder={t("a_enter_price") as string}
            value={props.productSelected?.price}
          />
          <Show when={errors("price")} keyed>
            <FormControlError class="error_message_block">
              <Text message={errors("price")?.[0] ?? ""} />
            </FormControlError>
          </Show>
        </FormControl>
      </div>
      <div class="field_wrapper">
        <FormControl id="category" isInvalid={!!errors("category")}>
          <FormControlLabel
            _after={{ content: "" }}
            class={"form_label"}
            for="category"
            _dark={{ _after: { color: "danger.300" } }}
          >
            <Text message="Category" />
          </FormControlLabel>
          <MultiSelect
            name={"category"}
            options={uniqueArray}
            placeholder={"a_select_categorys"}
            onChange={handleMultiSelect("category")}
            value={data().category}
            valueProperty={"title"}
            labelProperty={"title"}
            class={"w-full"}
          />
          <Show when={errors("category")} keyed>
            <FormControlError class="error_message_block">
              <Text message={errors("category")?.[0] ?? ""} />
            </FormControlError>
          </Show>
        </FormControl>
      </div>
      <div class="field_wrapper">
        <FormControl isRequired isInvalid={!!errors("enable")}>
          <FormControlLabel
            class={"form_label"}
            _dark={{ _after: { color: "danger.300" } }}
          >
            <Text message="enable" />
          </FormControlLabel>
          <Switch
            name={"enable"}
            value={data().enable}
            onChange={handleSelect("enable")}
          />
          <Show when={errors("enable")} keyed>
            <FormControlError class="error_message_block">
              <Text message={errors("enable")?.[0] || ""} />
            </FormControlError>
          </Show>
        </FormControl>
      </div>

      <div
        class="update_save_buttons_container"
        data-parent={props.requiredPermission.submit}
      >
        <div class="button_full has-permission">
          <Button
            _dark={darkNeutralButton}
            class="button_full"
            onClick={() => navigate("/products/list")}
            colorScheme="neutral"
          >
            <Text message="a_back" />
          </Button>
        </div>
        <div class="button_full has-permission">
          <Button
            _dark={darkPrimaryButtonWithBackground}
            class="button_full"
            type="submit"
            isDisabled={!isValid()}
            isLoading={isSubmitting()}
            loadingText={(<Text message="a_submitting" />) as string}
          >
            <Text message="a_save" />
          </Button>
        </div>
        <div class="button_full fallback">
          <Button
            _dark={darkNeutralButton}
            class="w-full"
            onClick={() => navigate("/products/list")}
          >
            <Text message="a_back" />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ProductForm;
