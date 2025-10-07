import { body } from "express-validator";
import { httpError } from "../utils/httpErrorHelper.js";

// ================= START: AUTH VALIDATIONS ================= //
export const registerValidation = [
  body("name", "Full name is required and must be at least 3 characters long")
    .isString()
    .trim()
    .isLength({ min: 3 }),

  body(
    "username",
    "Username is required and must be at least 3 characters long"
  )
    .isString()
    .trim()
    .isLength({ min: 3 }),

  body("email", "Invalid email address").isEmail(),
  body("password", "Password must be at least 6 characters")
    .isString()
    .trim()
    .isLength({ min: 6 }),
];

export const loginValidation = [
  body("email", "Invalid email address").isEmail(),
  body("password", "Password must be at least 6 characters")
    .isString()
    .trim()
    .isLength({ min: 6 }),
];
// ================= END: AUTH VALIDATIONS ================= //

// ================= START: USER VALIDATIONS ================= //
export const patchUserValidation = [
  body("name", "Full name must be at least 3 characters long")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3 }),
  body("username", "Username must be at least 3 characters long")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3 }),
  body("email", "Invalid email address").optional().isEmail(),
  body("currentPassword", "Current password must be at least 6 characters")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 6 }),
  body("newPassword", "New password must be at least 6 characters")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 6 }),
  body("confirmPassword", "Confirm password must be at least 6 characters")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 6 }),
];
// ================= END: USER VALIDATIONS ================= //

// ================= START: POST VALIDATIONS ================= //
export const postValidation = [
  body("title", "Please enter a title (min. 3 characters)")
    .isString()
    .trim()
    .isLength({ min: 3 }),
  body("desc", "Please enter a description (min. 3 characters)")
    .isString()
    .trim()
    .isLength({ min: 3 }),

  body("tags")
    .optional()
    .isString()
    .trim()
    .custom((value) => {
      const tagArray = value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      if (tagArray.length > 20) {
        httpError("Maximun 20 tags allowed", 422);
      }

      for (const tag of tagArray) {
        if (tag.length < 2 || tag.length > 20) {
          httpError("Tag must be 2-20 characters long", 422);
        }
      }

      return true;
    }),
];

export const pathPostValidation = [
  body("title", "Please enter a title (min. 3 characters)")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3 }),
  body("desc", "Please enter a description (min. 3 characters)")
    .optional()
    .isString()
    .trim()
    .isLength({ min: 3 }),

  body("tags")
    .optional()
    .isString()
    .trim()
    .custom((value) => {
      const tagArray = value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      if (tagArray.length > 20) {
        httpError("Maximun 20 tags allowed", 422);
      }

      for (const tag of tagArray) {
        if (tag.length < 2 || tag.length > 20) {
          httpError("Tag must be 2-20 characters long", 422);
        }
      }

      return true;
    }),
];

export const commentValidation = [
  body("comment", "Please write a comment with at least 2 characters")
    .isString()
    .trim()
    .isLength({ min: 2 }),
];
// ================= END: POST VALIDATIONS ================= //
