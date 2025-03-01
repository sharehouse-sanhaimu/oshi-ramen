import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/provider/SessionProvider";

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
		<SessionProvider>
			<html lang="ja">
				<body className={`${inter.className} min-h-screen flex flex-col`}>
					{children}
				</body>
			</html>
		</SessionProvider>
	);
}
