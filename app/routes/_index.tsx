import type { V2_MetaFunction } from "@remix-run/node";
import Navbar from "components/nav";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Nick's Blog" },
    { name: "description", content: "Hello!" },
  ];
};

export default function Index() {

  return (
    <Navbar />
  )
}