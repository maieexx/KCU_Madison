import Link from 'next/link';
import Image from 'next/image';
import '../../globals.css';


export default function Header() {
    return(
        <header className="bg-white shadow-md py-2">
            <div className="container mx-auto flex items-center justify-between px-1">


                {/* Navigation */}
                <ul className="flex space-x-20 items-center font-navbar text-base">
                    <li>
                        <Link href="/aboutKCU" className="hover:text-blue-600">
                        About KCU
                        </Link>
                    </li>
                    <li>
                        <Link href="/projects" className="hover:text-blue-600">
                        Projects
                        </Link>
                    </li>
                    <li>
                        <Link href="/community" className="hover:text-blue-600">
                        Community
                        </Link>
                    </li>
                    <li>
                        <Link href="/signup" className="hover:text-blue-600">
                        Sign Up
                        </Link>
                    </li>
                    <li>
                        <Link
                        href="/admin"
                        className="text-white bg-red-500 px-4 py-2 rounded hover:bg-red-600">
                        Admin
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
