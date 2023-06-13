import { Link } from "@remix-run/react";

export default function Navbar() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-100 p-6">
            <div className="flex items-center flex-shrink-0 text-gray-800 mr-6">
                <Link to=".">
                    <span className="text-xl font-bold uppercase">NICKHERRIG.COM</span>
                </Link>
             </div>
            <div className="flex items-center">
                <Link to="/posts">Posts</Link>
            </div>
        </nav>
    )
}