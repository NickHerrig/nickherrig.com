import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "nickherrig.com" },
    { name: "description", content: "Hey! 👋 " },
  ];
};

export default function Index() {
  return (
    <div>
      <h1>Welcome! 👋 </h1>
      <p>
        <a href="https://resume.nickherrig.com">Resume</a>
      </p>
    </div>
  );
}
