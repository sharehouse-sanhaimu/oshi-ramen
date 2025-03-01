import type { DBUser, User } from "@/types";
import type { User as FirebaseUser } from "@firebase/auth";

const storeStorageUser = (user: DBUser) => {
	localStorage.setItem("userID", JSON.stringify(user));
};

export const signInOrUp = async (firebaseUser: FirebaseUser) => {
	// TODO: サインインまたはサインアップ処理を実装する
	console.log("サインインまたはサインアップが完了しました")
};

const signUp = async (user: User) => {
	// TODO: 
	console.log("ユーザー登録が完了しました")
};

const toRoot = () => {
	window.location.href = "/";
};
