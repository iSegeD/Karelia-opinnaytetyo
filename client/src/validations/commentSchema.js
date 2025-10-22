import * as yup from "yup";

export const newCommentSchema = yup.object().shape({
  comment: yup
    .string()
    .trim()
    .min(2, "Please write a comment with at least 2 characters"),
});
