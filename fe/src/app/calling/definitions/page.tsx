export default function Page() {
  return <h1>Hello - definition directory... Next.js!</h1>
}

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
