import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export async function GET(req, { params }) {
  const { slug } = params;

  try {
    const docRef = doc(db, "blogs", slug.toLowerCase());
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return new Response(JSON.stringify({ error: "Post not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(docSnap.data()), { status: 200 });
  } catch (error) {
    console.error("Error fetching post:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
