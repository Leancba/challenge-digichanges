import { IconButton } from "@hope-ui/core";
import { Link } from "@solidjs/router";
import { Text, useI18n } from 'solid-i18n';
import { Component } from "solid-js";
import IconPencilAlt from "../../../../atoms/Icons/Stroke/IconPencilAlt";
import IconTrash from "../../../../atoms/Icons/Stroke/IconTrash";
import Card from "../../../shared/molecules/Card/Card";
import CardContent from "../../../shared/molecules/CardContent/CardContent";
import { CategoryApi } from "../../interfaces";

interface CategoryCardProps {
  role: CategoryApi;
  onDelete: () => void;
}

const CategoryCard: Component<CategoryCardProps> = (props) => (
  <Card>
    <CardContent class="card_container">
      <div class="card_media_object">
        <h6 class="card_media_object_title" data-parent="rolesShow">
          <Link
            class="card_media_object_link has-permission"
            href={`/category/${props.role.id}/update`}
          >
            {props.role.title}
          </Link>
          
          <span class="card_media_object_span fallback">
            {props.role.title}
          </span>
        </h6>
        <span style={{ color: props.role.enable ? "#00800059" : "#ff000082" }}>
          {props.role.enable ? <Text message="enable"/> : <Text message="disable"/>}
        </span>
      </div>

      <div class="card_third">
        <div data-parent="rolesUpdate">
          <div class="has-permission">
            <Link href={`/category/${props.role.id}/update`}>
              <IconButton
                aria-label="Edit"
                variant="plain"
                children={<IconPencilAlt />}
                colorScheme="success"
                _dark={{ color: "success.300", cursor: "pointer" }}
                size={"xs"}
              />
            </Link>
          </div>
        </div>
        <div data-parent="rolesDelete">
          <IconButton
            class="has-permission"
            aria-label="Delete Role"
            variant="plain"
            children={<IconTrash />}
            colorScheme="danger"
            onClick={props.onDelete}
            _dark={{ color: "danger.200", cursor: "pointer" }}
            size={"xs"}
          />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default CategoryCard;
