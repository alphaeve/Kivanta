// import { db } from "../lib/firebase";
import { db } from "./lib/firebase";

import { doc, getDoc } from "firebase/firestore";

export default async function ProblemPage({ params }) {
  const { slug } = params;
  const docRef = doc(db, "problems", slug);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return <div>Problem not found</div>;
  }

  const problem = docSnap.data();

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
      <p className="mb-6">{problem.description}</p>
      <h2 className="text-xl font-semibold mb-2">Solution</h2>
      <p>{problem.solution}</p>
    </main>
  );
}
