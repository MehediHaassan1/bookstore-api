/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import catchAsync from '../utils/catchAsync';

const validateRequest = (validations: any[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction): Promise<any>  => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  });
};

export default validateRequest;
