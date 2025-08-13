// app/page.jsx
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SearchPosts from "./SearchPosts"; // client component
import styles from "./HomePage.module.css";

export default function HomePage() {
  const contentDir = path.join(process.cwd(), "content");
  const files = fs.readdirSync(contentDir);

  const posts = files.map((file) => {
    const filePath = path.join(contentDir, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);
    return {
      slug: file.replace(/\.md$/, ""),
      title: data.title || file,
      description: data.description || "",
    };
  });

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Health Problems & Solutions</h1>
      <SearchPosts posts={posts} />
    </main>
  );
}
