// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import { db } from "../lib/firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { remark } from "remark";
// import html from "remark-html";

// export default function BlogPage() {
//   const { slug } = useParams();
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       const docRef = doc(db, "blogs", slug.toLowerCase());
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         const data = docSnap.data();
//         const processed = await remark().use(html).process(data.content);
//         setPost({ ...data, contentHtml: processed.toString() });
//       }
//     };
//     fetchPost();
//   }, [slug]);

//   if (!post) return <p>Loading...</p>;

//   return (
//     <main>
//       <h1>{post.title}</h1>
//       <p>{post.description}</p>
//       <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
//     </main>
//   );
// }






// before automation

// // app/problems/[slug]/page.jsx
// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import Link from "next/link";
// import { remark } from "remark";
// import html from "remark-html";
// import Head from "next/head";

// export const dynamicParams = false; // Important for static export

// export default async function BlogPage({ params }) {
//   const { slug } = params;

//   const filePath = path.join(process.cwd(), "content", `${slug}.md`);
//   if (!fs.existsSync(filePath)) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-gray-600">
//         <p>Article not found.</p>
//       </div>
//     );
//   }

//   const fileContent = fs.readFileSync(filePath, "utf8");
//   const { data, content } = matter(fileContent);

//   const processedContent = await remark().use(html).process(content);
//   const contentHtml = processedContent.toString();

//   return (
//     <>
//       <Head>
//         <title>{data.title} | Health Blog</title>
//         <meta name="description" content={data.description} />
//       </Head>

//       <main className="bg-gray-50 min-h-screen py-10 px-4 sm:px-10 lg:px-32 flex flex-col items-center">
//         <div className="w-full max-w-4xl mb-8">
//           <Link href="/">
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
//               ← Back to Home
//             </button>
//           </Link>
//         </div>

//         <article className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h1>
//           <p className="text-gray-700 text-lg mb-6">{data.description}</p>
//           <div
//             className="prose prose-lg prose-gray max-w-none"
//             dangerouslySetInnerHTML={{ __html: contentHtml }}
//           />
//         </article>
//       </main>
//     </>
//   );
// }

// // Generate static paths for all markdown files
// export async function generateStaticParams() {
//   const contentDir = path.join(process.cwd(), "content");
//   const files = fs.readdirSync(contentDir);

//   return files.map((file) => ({
//     slug: file.replace(/\.md$/, ""),
//   }));
// }
