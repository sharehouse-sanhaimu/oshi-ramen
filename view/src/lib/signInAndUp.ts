import { get_url } from "@/lib/utils";
import type { User as FirebaseUser } from "@firebase/auth";

const storeStorageUser = (uid: string) => {
	localStorage.setItem("userID", uid);
};

type responseJson = {
	message: string;
	data: {
		id: string;
	};
};

export const signInOrUp = async (firebaseUser: FirebaseUser) => {
	console.log("firebaseUser uid", firebaseUser.uid);
	console.log("firebaseUser displayName", firebaseUser.displayName);
	try {
		const res = await fetch("http://localhost:8000/v1/users", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				google_id: firebaseUser.uid,
				nickname: firebaseUser.displayName || "default_nickname", // ニックネームを追加
			}),
		});

		if (res.status === 200) {
			console.log("ユーザーが存在します");
		} else if (res.status === 201) {
			console.log("ユーザーを作成しました");
		} else if (res.status === 422) {
			console.log("リクエストが不正です", res);
			return;
		} else {
			console.log("予期せぬエラーが発生しました", res);
			return;
		}

		const responseJson = (await res.json()) as responseJson;
		const uid = responseJson.data.id;
		storeStorageUser(uid);

		toRoot();
		return uid;
	} catch (error) {
		console.error("エラーが発生しました:", error);
	}
};

const toRoot = () => {
	window.location.href = "/";
};
