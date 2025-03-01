import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "oshi",
	description: "oshi ramen",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={`${inter.className} min-h-screen flex flex-col`}>
				<div className="flex-grow">{children}</div>
			</body>
		</html>
	);
}
