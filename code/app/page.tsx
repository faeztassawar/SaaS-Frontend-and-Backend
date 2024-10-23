import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500">
      <h1 className="text-4xl font-bold text-white mb-8">
        Choose Your Template
      </h1>
      <div className="flex flex-col md:flex-row gap-8">
        <Link href="/template1">
          <button className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-full border-2 border-blue-700 hover:bg-blue-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Template 1
          </button>
        </Link>
        <Link href="/template2">
          <button className="px-8 py-4 bg-white text-purple-700 font-semibold rounded-full border-2 border-purple-700 hover:bg-purple-700 hover:text-white transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
            Template 2
          </button>
        </Link>
      </div>
    </div>
  );
}
