"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { remark } from "remark";
import html from "remark-html";

export default function BlogPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  const headings = [
    { text: "Overview", emoji: "✅", background: "linear-gradient(to right, #bbf7d0, #4ade80)", color: "#14532d" },
    { text: "Symptoms", emoji: "🩺", background: "linear-gradient(to right, #fecaca, #f87171)", color: "#7f1d1d" },
    { text: "Causes", emoji: "⚠️", background: "linear-gradient(to right, #fef9c3, #fde047)", color: "#78350f" },
    { text: "Prevention&Treatment", emoji: "💊", background: "linear-gradient(to right, #bfdbfe, #60a5fa)", color: "#1e3a8a" },
  ];

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, "blogs", slug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const processed = await remark().use(html).process(data.content);
        setPost({ ...data, contentHtml: processed.toString() });
      }
    };
    fetchPost();
  }, [slug]);

  if (!post) return (
    <p className="text-center text-gray-500 text-xl md:text-2xl mt-12">
      Loading...
    </p>
  );

  const processContent = (markdown) => {
    const parts = [];
    let remaining = markdown;

    headings.forEach((h) => {
      const index = remaining.indexOf(h.text);
      if (index !== -1) {
        const before = remaining.slice(0, index).trim();
        if (before) parts.push({ type: "text", content: before });
        parts.push({ type: "heading", heading: h });
        remaining = remaining.slice(index + h.text.length).trim();
      }
    });

    if (remaining) parts.push({ type: "text", content: remaining });
    return parts;
  };

  return (
    <main className="bg-gray-50 min-h-screen flex justify-center px-4 py-12">
      <div className="grid grid-cols-12 gap-6 w-full max-w-7xl">

        {/* Left Ad Space */}
        <div className="hidden lg:block col-span-2">
          <div className="bg-gray-200 rounded-lg h-full flex items-center justify-center text-gray-500">
            Ad Space
          </div>
        </div>

        {/* Blog Content */}
        <article className="col-span-12 lg:col-span-8 bg-white rounded-2xl shadow-2xl p-14 leading-relaxed">

          <h1 className="text-6xl md:text-7xl font-extrabold text-center mb-10 tracking-wide">
            {post.title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-700 mb-12 text-center tracking-wide">
            {post.description}
          </p>

          <div className="max-w-none space-y-8 text-gray-900 leading-loose">
            {processContent(post.contentHtml).map((part, idx) =>
              part.type === "heading" ? (
                <div
                  key={idx}
                  className="block px-6 py-4 rounded-2xl my-6 text-3xl md:text-4xl font-extrabold shadow-lg"
                  style={{ background: part.heading.background, color: part.heading.color }}
                >
                  {part.heading.emoji} {part.heading.text}
                </div>
              ) : (
                <p
                  key={idx}
                  className="text-lg md:text-xl text-gray-900 leading-relaxed mb-6"
                  dangerouslySetInnerHTML={{ __html: part.content }}
                />
              )
            )}
          </div>

        </article>

        {/* Right Ad Space */}
        <div className="hidden lg:block col-span-2">
          <div className="bg-gray-200 rounded-lg h-full flex items-center justify-center text-gray-500">
            Ad Space
          </div>
        </div>

      </div>
    </main>
  );
}































 // without automate



// // app/[slug]/page.jsx
// import fs from "fs";
// import path from "path";
// import matter from "gray-matter";
// import Link from "next/link";
// import { remark } from "remark";
// import html from "remark-html";
// import Head from "next/head";

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
//         {/* Back button */}
//         <div className="w-full max-w-4xl mb-8">
//           <Link href="/">
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition">
//               ← Back to Home
//             </button>
//           </Link>
//         </div>

//         {/* Blog Article */}
//         <article className="w-full max-w-4xl bg-white shadow-xl rounded-2xl p-10">
//           <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight">
//             {data.title}
//           </h1>
//           <p className="text-gray-700 text-xl mb-8 leading-relaxed">
//             {data.description}
//           </p>
//           <div
//             className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-h2:text-2xl prose-h2:font-semibold prose-p:text-gray-700 prose-p:leading-relaxed prose-li:marker:text-blue-600 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
//             dangerouslySetInnerHTML={{ __html: contentHtml }}
//           />
//         </article>

//         {/* Related Articles */}
//         <section className="w-full max-w-4xl mt-12">
//           <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div className="bg-white p-6 shadow rounded-xl hover:shadow-lg transition">
//               <p className="text-gray-700 font-medium">AI-powered related post 1</p>
//             </div>
//             <div className="bg-white p-6 shadow rounded-xl hover:shadow-lg transition">
//               <p className="text-gray-700 font-medium">AI-powered related post 2</p>
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }

// export async function generateStaticParams() {
//   const contentDir = path.join(process.cwd(), "content");
//   const files = fs.readdirSync(contentDir);

//   return files.map((file) => ({
//     slug: file.replace(/\.md$/, ""),
//   }));
// }
