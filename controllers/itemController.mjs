import expressAsyncHandler from "express-async-handler";
import db from '../db/queries.mjs'
import { query, body, validationResult } from "express-validator";

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const emailErr = "must be formatted properly, i.e johndoe@gmail.com";
const ageErr = "must be a number between 18 and 120";
const bioErr = "must have a maximum of 200 characters";

const validateUser = [
  body("firstName").trim()
    .isAlpha().withMessage(`First name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
  body("lastName").trim()
    .isAlpha().withMessage(`Last name ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
  body("email").trim()
    .isEmail().withMessage(`Email ${emailErr}`),
  body("age").trim()
    .optional()
    .isInt({ min: 18, max: 120 }).withMessage(`Age ${ageErr}`),
  body("bio").trim()
    .optional()
    .isAlpha().withMessage(`Bio ${alphaErr}`)
    .isLength({ min: 1, max: 200 }).withMessage(`Bio ${bioErr}`),
];

const validateSearch = [
  query('searchName').isString().withMessage('Search name must be a string'),
  query('searchEmail').isEmail().withMessage('Search email must be a valid email'),
];

// We can pass an entire array of middleware validations to our controller.
export const usersCreatePost = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("createUser", {
        title: "Create user",
        errors: errors.array(),
      });
    }
    const { firstName, lastName, email, age, bio } = req.body;
    UsersStorage.addUser({ firstName, lastName, email, age, bio });
    res.redirect("/");
  }
]



const getItem = expressAsyncHandler(async (req, res) => {
    const id = req.params.id
    const item = await db.getItem(id)

    res.render("item", { item: item });    
})

const updateItem = [
    validateUser, 
    expressAsyncHandler(async (req, res) => {
            
})]

export default {getItem, updateItem}