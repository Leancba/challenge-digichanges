import { IconButton } from "@hope-ui/core";
import { Link } from "@solidjs/router";
import { Component } from "solid-js";
import IconPencilAlt from "../../../../atoms/Icons/Stroke/IconPencilAlt";
import IconTrash from "../../../../atoms/Icons/Stroke/IconTrash";
import { permissions } from "../../../../config/permissions";
import Card from "../../../shared/molecules/Card/Card";
import CardContent from "../../../shared/molecules/CardContent/CardContent";
import { ProductApi } from "../../interfaces";

interface ProductCardProps {
  product: ProductApi;
  onDelete: () => void;
}

const ProductCard: Component<ProductCardProps> = (props) => (
  <Card>
    <CardContent class="card_container">
      <div class="card_media_object">
        <h6 class="card_media_object_title" data-parent={permissions.PRODUCT.LIST}>
          <Link
            class="card_media_object_link has-permission"
            href={`/products/${props.product.id}/update`}
          >
            {`${props.product.title}`}
          </Link>
        </h6>
        <p class={"text-ellipsis overflow-hidden whitespace-nowrap"}>
          ${props.product.price}
        </p>
        {typeof props.product.category === "string" ? (
          <p class={"text-ellipsis overflow-hidden whitespace-nowrap"}>
            {props.product.category}
          </p>
        ) : Array.isArray(props.product.category) ? (
          <p class={"text-ellipsis overflow-hidden"}>
            {props.product.category?.join(" - ")}
          </p>
        ) : null}
        <span style={{ color: props.product.enable ? "#00800059" : "#ff000082" }}>
          {props.product.enable ? "Habilitado" : "Deshabilitado"}
        </span>
      </div>

      <div class="card_third">
        <div data-parent={permissions.PRODUCT.UPDATE}>
          <div class="has-permission">
            <Link href={`/products/${props.product.id}/update`}>
              <IconButton
                _dark={{ color: "success.300", cursor: "pointer" }}
                size={"xs"}
                aria-label="Edit"
                variant="plain"
                colorScheme="success"
                children={<IconPencilAlt />}
              />
            </Link>
          </div>
        </div>
        <div data-parent={permissions.PRODUCT.DELETE}>
          <IconButton
            _dark={{ color: "danger.200", cursor: "pointer" }}
            size={"xs"}
            class="has-permission"
            aria-label="Delete User"
            variant="plain"
            colorScheme="danger"
            onClick={props.onDelete}
            children={<IconTrash />}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default ProductCard;
