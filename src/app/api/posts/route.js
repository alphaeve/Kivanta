// /api/posts/route.js
import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../../lib/firebase";
// import { db } from "@/lib/firebase";
import { db } from "../../lib/firebase"; // adjust relative to your file location




export async function GET() {
  try {
    const snapshot = await getDocs(collection(db, "blogs"));
    const posts = snapshot.docs.map(doc => ({
      slug: doc.id,          // required by SearchPosts
      title: doc.data().title,
      description: doc.data().description,
    }));
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), { status: 500 });
  }
}
