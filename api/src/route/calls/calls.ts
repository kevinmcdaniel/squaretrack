import express from "express";

// temporary
import { prisma } from "../../database";
import { isNumeric } from "../../common/utils";


export const callRoute = express.Router();

class ValidationError extends Error {
  constructor(message: any) {
      super(message);
      this.name = "ValidationError";
  }
}

callRoute.get('/list', async (req, res) => {
  const records = await prisma.call.findMany();
  res.json({
    message: 'List of all calls',
    data: records,
  });
});

callRoute.get('/list/:id', async (req, res, next) => {
  try {
    if (!isNumeric(req.params.id)) {
      throw new ValidationError('Invalid id passed');
    }
    const call = await prisma.call.findUnique({
      where: {
        callId: parseInt(req.params.id, 10),
      },
    });
    res.json({
      message: 'Unique call by id',
      data: call,
    });
  } catch (error: any) {
    next(error);
  }
});

// import express from 'express';

// import {
//   listCalls,
// } from '../../controller';
// import { openFeatureValidation } from '../../middleware/openFeatureValidation';
// import { authorizeUser } from '../../middleware/authorizeUser';
// import { activateAllCompaniesFromHybris } from '../../controller/company/activateCompany';

// const callRoute = express.Router();

// callRoute.post(
  // '/create',
  // openFeatureValidation('v1-company-create'),
  // authorizeUser,
  // app.post('/users', async (req, res) => {
    //   const { name, email } = req.body;
    //   const user = await prisma.user.create({
      //     data: {
        //       name,
        //       email,
        //     },
        //   });
        //   res.json({
          //     message: 'User created successfully',
          //     data: user,
          //   });
          // });
// );

// callRoute.post(
//   '/update/:companyId',
//   openFeatureValidation('v1-company-update'),
//   authorizeUser,
//   updateCompany,
// );
// callRoute.delete(
//   '/delete/:companyId',
//   openFeatureValidation('v1-company-delete'),
//   authorizeUser,
//   deleteCompany,
// );
// callRoute.get(
//   '/getCompanyDetail/:companyId',
//   openFeatureValidation('v1-company-get'),
//   authorizeUser,
//   getCompanyDetail,
// );
// callRoute.post(
//   '/registerLead',
//   openFeatureValidation('v1-lead-register'),
//   registerLead,
// );
// callRoute.post(
//   '/update-status/:companyId',
//   openFeatureValidation('uclstatus-company'),
//   authorizeUser,
//   updateStatus,
// );
// callRoute.get(
//   '/getCompanyForEmailDomain',
//   openFeatureValidation('v1-companyForED-get'),
//   getCompanyForED,
// );
// callRoute.post(
//   '/add-location/:companyId',
//   openFeatureValidation('addlocation-company'),
//   authorizeUser,
//   addLocation,
// );
// callRoute.get(
//   '/get-location/:companyId',
//   openFeatureValidation('getlocation-company'),
//   authorizeUser,
//   getLocation,
// );
// callRoute.post(
//   '/update-location/:locationId',
//   openFeatureValidation('updatelocation-company'),
//   authorizeUser,
//   updateCompanyLocation,
// );
// callRoute.get(
//   '/summary/:companyId',
//   openFeatureValidation('v1-company-get-summary'),
//   authorizeUser,
//   getAccountSummary,
// );

// callRoute.post('/update-active-status', activateAllCompaniesFromHybris);

// callRoute.get(
//   '/getCompanyForCustomer/:email',
//   openFeatureValidation('v1-company-for-user-get'),
//   authorizeUser,
//   getCompanyForCustomer,
// );

// export { callRoute };