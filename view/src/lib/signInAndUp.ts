import type { User as FirebaseUser } from "@firebase/auth";
import { get_url } from "@/lib/utils";

const storeStorageUser = (uid: string) => {
	localStorage.setItem("userID", uid);
};

export const signInOrUp = async (firebaseUser: FirebaseUser) => {
	// TODO: サインインまたはサインアップ処理を実装する
	storeStorageUser(firebaseUser.uid);

	console.log("サインインまたはサインアップが完了しました")

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

	toRoot();
};

const signUp = async () => {
	// TODO: 
	console.log("ユーザー登録が完了しました")
};

const toRoot = () => {
	window.location.href = "/";
};
