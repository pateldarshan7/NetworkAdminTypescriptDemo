 import { body, validationResult } from 'express-validator';
import { Request, Response } from "express";


const userValidationRules = () => {
  return [
    // username must be an email
    body('UserName').not().isEmpty().withMessage(' UserName is Required').trim().escape(),
    body('Password').not().isEmpty().withMessage(' Password is Required').isLength({ min: 8 }).withMessage(' Password is Must 8 char long').not()
    .isIn(['12345678', 'password', 'god'])
    .withMessage("You can't use a common password like... password , 123345678"),
    body('City').not().isEmpty().withMessage(' City is Required'),
  ]}
  const validate = (req:Request, res:Response ,next:Function) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors : any[] = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

  export {
  userValidationRules,
  validate,
}