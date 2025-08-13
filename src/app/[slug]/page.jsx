// app/[slug]/page.jsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { remark } from "remark";
import html from "remark-html";

export default async function BlogPage({ params }) {
  const { slug } = params;

  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);

  // Convert markdown to HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-10 lg:px-32 flex flex-col items-center">
      {/* Back button */}
      <div className="w-full max-w-4xl mb-8">
        <Link href="/">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
            ← Back to Home
          </button>
        </Link>
      </div>

      {/* Article */}
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h1>
        <p className="text-gray-700 text-lg mb-6">{data.description}</p>

        <article
          className="prose prose-lg prose-gray max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />
      </div>

      {/* Space for ads */}
      {/* <div className="w-full max-w-4xl mt-10">
        <div className="bg-gray-200 h-24 rounded-lg flex items-center justify-center text-gray-500">
          Advertisement
        </div>
      </div> */}
    </div>
  );
}

export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs.readdirSync(contentDir);

  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}
