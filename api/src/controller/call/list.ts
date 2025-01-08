
// import { listCallService } from '../../service/call/list';
// // import { sendResponse } from '../../common';
// // import { statusCodes, ERR_CODES, MSG_CODES } from '../../constant';
// import type { Request, Response } from 'express';
// // import { initLogger } from '../../common/logger';

// const listCall = async (
//   req: Request,
//   res: Response,
// ): Promise<Response | void> => {
// //   const logger = initLogger(req);
//   try {

//     const validationData = {
//       "countryCode": req.query.code
//     }
//     const listCall = await listCountryService(validationData);

//     if (listCall.data.length <= 0) {
//       return sendResponse({
//         res,
//         success: false,
//         statusCode: statusCodes.notFound,
//         message: 'Country Data not found.',
//         errorCode: ERR_CODES.country.dataNotExists,
//         data: '',
//         messageCodes: [MSG_CODES.country.countryNotFound],
//       });
//     }

//     return sendResponse({
//       res,
//       success: true,
//       statusCode: statusCodes.success,
//       message: `Country Listed.`,
//       errorCode: '',
//       data: listCall.data,
//       messageCodes: [MSG_CODES.country.countryListed],
//     });
//   } catch (error) {
//     logger.error('Error: ', error);
//     if (!res.headersSent) {
//       return sendResponse({
//         res,
//         success: false,
//         statusCode: statusCodes.internalServerError,
//         message: error.message,
//         errorCode: ERR_CODES.commonErr.internalServerErr,
//         data: '',
//         messageCodes: [MSG_CODES.common.internalServerError],
//       });
//     }
//   }
// };

// export { listCall };
