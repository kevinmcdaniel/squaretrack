// function generateStaticParams() {}



import { fetchData } from '@/lib/hac/fetch';
import Image from 'next/image';

const Page = async () => {
  return <h1>Hello - call slug page. Next.js!</h1>
}

// import setpic from './public/squareset.png';

// const Page = async () => {
//   const slug = 1;
//   const call: any = fetchData(`call/list/${slug}`);
//   console.log('himom', call);
//   return (
//     <div>
//       <Image
//         src={setpic} //"public/squareset.png"
//         alt="Squared Set"
//         // width="80"
//         // height="80"
//       // height={500} automatically provided
//       // blurDataURL="data:..." automatically provided
//       // placeholder="blur" // Optional blur-up while loading
//       />
//       <p>
//         {call.data}
//         {/* ... </br>
//           call.data.name </br>
//           {call.data.id}
//           // <Call key={call.callId} call={call} /> */}
//       </p>
//     </div>
//   );
// };

export default Page;

// stylining... conditionally...
// using clsx... seems like a lot of code (will need some helper functons...)

// import clsx from 'clsx';

// export default function InvoiceStatus({ status }: { status: string }) {
//   return (
//     <span
//       className={clsx(
//         'inline-flex items-center rounded-full px-2 py-1 text-sm',
//         {
//           'bg-gray-100 text-gray-500': status === 'pending',
//           'bg-green-500 text-white': status === 'paid',
//         },
//       )}
//     >
//     // ...
// )}