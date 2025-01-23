import { fetchData } from "@/lib/hac/fetch"
import Link from 'next/link';


const Page = async () => {
  const calls: any = await fetchData('call/list');
  return (
    <ul>
      {calls.message}...
      {calls.data.map((call: any) => (
         <li key={call.callId}>
           <Link href={`/calling/calls/${call.callId}`}>{call.name}</Link>
         </li>

        // <Call key={call.callId} call={call} />
      ))}
    </ul>
  );
};

export default Page;

// import { getPosts } from '@/lib/posts'
// import { Post } from '@/ui/post'

// export default async function Page() {
//   const posts = await getPosts()

//   return (
//     <ul>
//       {posts.map((post) => (
//         <Post key={post.id} post={post} />
//       ))}
//     </ul>
//   )
// }


// import Link from 'next/link'

// export default async function Post({ post }) {
//   const posts = await getPosts()

//   return (
//     <ul>
//       {posts.map((post) => (
//         <li key={post.slug}>
//           <Link href={`/blog/${post.slug}`}>{post.title}</Link>
//         </li>
//       ))}
//     </ul>
//   )
// }
