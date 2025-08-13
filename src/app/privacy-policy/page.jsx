// app/privacy-policy/page.jsx
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-10 lg:px-32 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-700 mb-4">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit our website.
        </p>
        <p className="text-gray-700 mb-4">
          We do not sell or share your personal information with third parties. Cookies may be used to enhance your experience.
        </p>
        <p className="text-gray-700 mb-4">
          By using our website, you consent to the practices described in this Privacy Policy.
        </p>
        <Link href="/" className="text-blue-600 font-semibold hover:underline mt-6 inline-block">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
