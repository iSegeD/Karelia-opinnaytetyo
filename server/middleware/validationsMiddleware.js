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
