import { body } from "express-validator";

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 255 characters.";
const sizeErr = "must be XS,S,M,L,XL,XXL"
const priceErr = "must be an amount in dollars"
const priceAmountErr = "must be less than $10000"

const validateNewProduct = [
  body("createName").trim()
    .isAlpha().withMessage(`Name ${alphaErr}`)
    .isLength({ min: 1, max: 255 }).withMessage(`Name ${lengthErr}`),
  body("createSize").trim().toUpperCase()
    .isIn(['XS', 'S', 'M', 'L', 'XL', 'XXL']).withMessage(`Size ${sizeErr}`),
  body("createColor").trim().toUpperCase()
    .isAlpha().withMessage(`Color ${alphaErr}`)
    .isLength({ min: 1, max: 255 }).withMessage(`Color ${lengthErr}`),
  body("createPrice").trim()
    .isNumeric().withMessage(`Price ${priceErr}`)
    .isLength({ min: 1, max: 5 }).withMessage(`Price ${priceAmountErr}`),
  body("password").trim()
    .equals("mendez9908").withMessage("Wrong password")
];

const validateUpdateProduct = [
  body("editName").trim()
    .isAlpha().withMessage(`Name ${alphaErr}`)
    .isLength({ min: 1, max: 255 }).withMessage(`Name ${lengthErr}`),
  body("editSize").trim().toUpperCase()
    .isIn(['XS', 'S', 'M', 'L', 'XL', 'XXL']).withMessage(`Size ${sizeErr}`),
  body("editColor").trim().toUpperCase()
    .isAlpha().withMessage(`Color ${alphaErr}`)
    .isLength({ min: 1, max: 255 }).withMessage(`Color ${lengthErr}`),
  body("editPrice").trim()
    .isNumeric().withMessage(`Price ${priceErr}`)
    .isLength({ min: 1, max: 5 }).withMessage(`Price ${priceAmountErr}`),
  body("password").trim()
    .equals("mendez9908").withMessage("Wrong password")
];

export { validateNewProduct, validateUpdateProduct };