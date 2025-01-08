
// import { prisma } from '../../database';


// // import type { CommonServiceResponse } from '../../common/types';

// const listCallService = async (req: any): Promise<Response> => {
//   try {
//     let calls = await prisma.call.findMany({
//     //   where: {
//     //     countryCode: req.countryCode,
//     //   },
//     //   include: {
//     //     states: true
//     //   }
//     });

//     if (!calls) {
//       return { 
//         // err: true,
//         data: '',
//       }; 
//     }
//     return {
//       err: false,
//       msg: 'Success',
//       data: calls,
//     };
//   } catch (error) {
//     return {
//       err: true,
//       msg: 'Could not list Country: ' + error.message,
//       data: '',
//     };
//   }
// };

// export { listCallService };
