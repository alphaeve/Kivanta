"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import styles from "./HomePage.module.css";

export default function SearchPosts({ posts }) {
  const [query, setQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, posts]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search health problems..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchBox}
      />
      <ul className={styles.postList}>
        {filteredPosts.map((post) => (
          <li key={post.slug} className={styles.postCard}>
            <Link href={`/${post.slug}`} className={styles.postTitle}>
              {post.title}
            </Link>
            <p className={styles.postDescription}>{post.description}</p>
          </li>
        ))}
        {filteredPosts.length === 0 && <p>No results found.</p>}
      </ul>
    </div>
  );
}
