// app/[slug]/page.jsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { remark } from "remark";
import html from "remark-html";
import Head from "next/head";

// Fetch markdown content for a given slug
export default async function BlogPage({ params }) {
  const { slug } = params;

  const filePath = path.join(process.cwd(), "content", `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        <p>Article not found.</p>
      </div>
    );
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  // Convert markdown to HTML
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return (
    <>
      <Head>
        <title>{data.title} | Health Blog</title>
        <meta name="description" content={data.description} />
      </Head>

      <main className="bg-gray-50 min-h-screen py-10 px-4 sm:px-10 lg:px-32 flex flex-col items-center">
        {/* Back button */}
        <div className="w-full max-w-4xl mb-8">
          <Link href="/">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
              ← Back to Home
            </button>
          </Link>
        </div>

        {/* Blog Article */}
        <article className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.title}</h1>
          <p className="text-gray-700 text-lg mb-6">{data.description}</p>
          <div
            className="prose prose-lg prose-gray max-w-none"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        {/* Placeholder: AI-powered Related Articles */}
        <section className="w-full max-w-4xl mt-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Related Articles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Replace these divs with dynamic AI recommendations */}
            <div className="bg-white p-4 shadow rounded hover:shadow-lg transition-shadow">
              <p className="text-gray-700">AI-powered related post 1</p>
            </div>
            <div className="bg-white p-4 shadow rounded hover:shadow-lg transition-shadow">
              <p className="text-gray-700">AI-powered related post 2</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

// Generate static paths for all markdown files
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs.readdirSync(contentDir);

  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}
