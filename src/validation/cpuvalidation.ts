import { body, validationResult } from "express-validator";
import { Request, Response } from "express";
const cpuValidationRules = () => {
  return [
    // username must be an email
    body("CpuName").not().isEmpty().withMessage(" CpuName is Required").trim(),
    body("ModelNo").not().isEmpty().withMessage(" ModelNo is Required").trim(),
    body("Processor")
      .not()
      .isEmpty()
      .withMessage(" Processor is Required")
      .trim(),
    body("CreatedBy")
      .not()
      .isEmpty()
      .withMessage(" CreatedBy is Required")
      .trim(),
  ];
};
const cpuvalidate = (req: Request, res: Response, next: Function) => {
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

export { cpuValidationRules, cpuvalidate };
