import Link from "next/link";
import React from "react";

export const Header = () => {
	return (
		<header className="bg-yellow-600 text-white p-4">
			<div className="container mx-auto">
				<Link href="/">
					{/* <h1 className="text-xl font-bold cursor-pointer">推らーめん</h1> */}
				</Link>
			</div>
		</header>
	);
};
