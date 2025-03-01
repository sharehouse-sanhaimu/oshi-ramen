"use client";

import { useState } from "react";

export default function Home() {
	const [isPointDialog, setPointDialog] = useState<boolean>(false);
	if (isPointDialog) {
		return <div>login</div>;
	}
	return (
		<div className="flex flex-col min-h-screen px-10 py-10 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-50">
			<div className="flex flex-col items-center justify-center space-y-6">
				<div>
					<h1 className="text-4xl font-bold text-center text-black">Oshi</h1>
					<p className="text-center text-black">Ramen</p>
				</div>
			</div>
		</div>
	);
}
