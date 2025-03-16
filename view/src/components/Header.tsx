import Link from "next/link";
import React from "react";

export const Header = () => {
	return (
		<header className="bg-gradient-to-r from-blue-100 to-purple-100 shadow-lg py-4">
			<div className="container mx-auto flex items-center justify-between px-4">
				<Link href="/">
					<h1 className=" text-zinc-700 text-2xl font-extrabold tracking-wide cursor-pointer hover:underline transition-all duration-300">
						推し麺ノート
					</h1>
				</Link>
				<nav>
					<ul className="flex space-x-6">
						<li>
							<Link
								href="/"
								className="hover:text-yellow-200 transition-colors duration-300"
							>
								メニュー
							</Link>
						</li>
					</ul>
				</nav>
			</div>
		</header>
	);
};
