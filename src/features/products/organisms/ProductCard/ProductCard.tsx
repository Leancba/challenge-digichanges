import { IconButton } from "@hope-ui/core";
import { Link } from "@solidjs/router";
import { Component } from "solid-js";
import IconPencilAlt from "../../../../atoms/Icons/Stroke/IconPencilAlt";
import IconTrash from "../../../../atoms/Icons/Stroke/IconTrash";
import Card from "../../../shared/molecules/Card/Card";
import CardContent from "../../../shared/molecules/CardContent/CardContent";
import { ProductApi } from "../../interfaces";

interface UserCardProps {
  user: ProductApi;
  onDelete: () => void;
}

const UserCard: Component<UserCardProps> = (props) => (
  <Card>
    <CardContent class="card_container">
      <div class="card_media_object">
        <h6 class="card_media_object_title" data-parent="usersShow">
          <Link
            class="card_media_object_link has-permission"
            href={`/products/${props.user.id}/update`}
          >
            {`${props.user.title}`}
          </Link>
        </h6>
        <p class={"text-ellipsis overflow-hidden whitespace-nowrap"}>
          ${props.user.price}
        </p>
        {typeof props.user.category === "string" ? (
          <p class={"text-ellipsis overflow-hidden whitespace-nowrap"}>
            {props.user.category}
          </p>
        ) : Array.isArray(props.user.category) ? (
          <p class={"text-ellipsis overflow-hidden"}>
            {props.user.category?.join(" - ")}
          </p>
        ) : null}
        <span style={{ color: props.user.enable ? "#00800059" : "#ff000082" }}>
          {props.user.enable ? "Habilitado" : "Deshabilitado"}
        </span>
      </div>

      <div class="card_third">
        <div data-parent="usersUpdate">
          <div class="has-permission">
            <Link href={`/products/${props.user.id}/update`}>
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
        <div data-parent="usersDelete">
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

export default UserCard;
