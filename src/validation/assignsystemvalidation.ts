import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
const asignsystemValidationRules = () => {
  return [
    // username must be an email
    body("MoniterId")
      .not()
      .isEmpty()
      .withMessage(" MoniterId is Required")
      .trim(),
    body("CpuId").not().isEmpty().withMessage(" CpuId is Required").trim(),
    body("MouseId").not().isEmpty().withMessage(" MouseId is Required").trim(),
    body("AssignToUserId")
      .not()
      .isEmpty()
      .withMessage(" AssignToUserId is Required")
      .trim(),
  ];
};
const asignsystemvalidate = (req: Request, res: Response, next: Function) => {
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

export { asignsystemValidationRules, asignsystemvalidate };
