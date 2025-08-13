// app/contact/page.jsx
import Link from "next/link";

export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-10 lg:px-32 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <p className="text-gray-700 mb-4">
          Have questions or suggestions? We'd love to hear from you!
        </p>

        <form className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            placeholder="Your Message"
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows={5}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Send Message
          </button>
        </form>

        <Link href="/" className="text-blue-600 font-semibold hover:underline mt-6 inline-block">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
