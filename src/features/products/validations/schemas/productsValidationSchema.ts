import { boolean, object, number, string, array } from "yup";

const productsSchema = object({
  price: number().required("av_required"),
  title: string()
    .min(3, "av_too_short")
    .max(50, "av_too_long")
    .required("av_required"),
  category: array().of(string().required("av_required"))
    .min(1, "av_min_categories")
    .required("av_required"),
  enable: boolean().required("av_required"),
});

export default productsSchema;


