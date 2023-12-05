import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "nickherrig.com" },
    { name: "description", content: "Hey! 👋 " },
  ];
};

export default function Index() {
  return (
    <section className="w-full h-screen bg-gray-100 dark:bg-gray-900 flex flex-col justify-center items-center">
      <div className="flex flex-col items-center space-y-6">
        <div className="w-48 h-48 rounded-full overflow-hidden">
          <img
            alt="User profile"
            className="object-cover"
            height="192"
            src="https://avatars.githubusercontent.com/u/33797354?v=4"
            width="192"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">Welcome! 👋 </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          I'm a software engineer helping businesses adapt emerging technologies.
        </p>
        <a href="https://resume.nickherrig.com">
          <button
            className="px-4 py-2 text-lg font-medium border-gray-800 dark:border-gray-200 text-gray-800 dark:text-gray-200 hover:bg-gray-800 hover:text-gray-100 dark:hover:bg-gray-200 dark:hover:text-gray-900"
          >
            View My Resume
          </button>
        </a>
      </div>
    </section>
  )

}
