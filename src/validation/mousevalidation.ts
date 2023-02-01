import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
const mouseValidationRules = () => {
  return [
    // username must be an email
    body("MouseName")
      .not()
      .isEmpty()
      .withMessage(" MoniterName is Required")
      .trim(),
    body("ModelNo").not().isEmpty().withMessage(" ModelNo is Required").trim(),
    body("CreatedBy")
      .not()
      .isEmpty()
      .withMessage(" CreatedBy is Required")
      .trim(),
  ];
};
const mousevalidate = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: any[] = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors,
  });
};

export { mouseValidationRules, mousevalidate };
