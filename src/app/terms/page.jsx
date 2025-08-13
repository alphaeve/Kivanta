// app/terms/page.jsx
import Link from "next/link";

export default function Terms() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-10 lg:px-32 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-gray-700 mb-4">
          By using this website, you agree to comply with our Terms of Service. The content is for informational purposes only.
        </p>
        <p className="text-gray-700 mb-4">
          We are not responsible for any actions taken based on the information provided on this website.
        </p>
        <Link href="/" className="text-blue-600 font-semibold hover:underline mt-6 inline-block">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
