"use client";
import { useEffect } from "react";
import { userIDStore } from "@/zustand/userIdStore";

export interface SessionProviderProps {
	children: React.ReactNode;
}

// クラアントのローカルストレージでデータ保持してます
const SessionProvider = ({ children }: SessionProviderProps) => {
	useEffect(() => {
		if (window.location.pathname === "/login") {
			return;
		}

		const userId = localStorage.getItem("userID");
		const getID = userIDStore.getState().getID;
		const id = getID();
		console.log("id", id);

		if (!userId) {
			console.log("ログインしてください")
			window.location.href = "/login";
			return;
		}

		console.log("既にログインしています")
	}, []);

	return <>{children}</>;
};

export default SessionProvider;
