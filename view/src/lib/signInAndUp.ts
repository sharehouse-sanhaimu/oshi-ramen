import type { User as FirebaseUser } from "@firebase/auth";
import { get_url } from "@/lib/utils";
import { userIDStore } from "@/zustand/userIdStore";

const storeStorageUser = (uid: string) => {
	localStorage.setItem("userID", uid);
};

export const signInOrUp = async (firebaseUser: FirebaseUser) => {
	// TODO: サインインまたはサインアップ処理を実装する
	storeStorageUser(firebaseUser.uid);

	try {
		// TODO: バックエンドが完成したら繋ぎこむ
		// const res = await fetch(get_url("/v1/users"), {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify({
		// 		google_id: firebaseUser.uid,
		// 	}),
		// });
		const responseMock = {
			status: 200,
			data: {
				id: "1",
			},
		}
		const res = responseMock;

		if (res.status === 200) {
			console.log("ユーザーが存在します")
		}
		else if (res.status === 201) {
			console.log("ユーザーを作成しました");
		}
		else if (res.status === 422) {
			console.log("リクエストが不正です", res);
			return;
		}
		else {
			console.log("予期せぬエラーが発生しました", res);
			return;
		}

		const responseJson = res;
		const uid = responseJson.data.id;
		storeStorageUser(uid);
		const setID	= userIDStore.getState().setID;
		setID(uid);

		toRoot();
		return uid;
	} catch (error) {
		console.error("エラーが発生しました:", error);
	}

};

const signUp = async () => {
	// TODO: 
	console.log("ユーザー登録が完了しました")
};

const toRoot = () => {
	window.location.href = "/";
};
