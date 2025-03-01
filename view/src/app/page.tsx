"use client";

import { RamenGallery } from "@/components/RamenGallery";
import type { RamenGalleryList } from "@/types/RamenGallery";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { compressImage } from "@/lib/compressImage";
import { getUrl } from "@/lib/utils";
import { postSchema } from "@/types/post";
import type { Post } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
	const [userId, setUserId] = useState<number | null>(null);
	const [isFile, setIsFile] = useState<boolean>(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const [gallery, setGallery] = useState<RamenGalleryList>([]);

	const form = useForm<Post>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			user_id: 0,
			store_name: "",
			ramen_name: "",
			file: null,
			deliciousness_id: 3,
			portion_id: 3,
			thick_id: 3,
			texture_id: 3,
			soup_id: 3,
		},
	});

	useEffect(() => {
		const userID = localStorage.getItem("userID");
		const userIDNum = Number(userID);
		if (userID) {
			setUserId(userIDNum);
		} else {
			setUserId(null);
		}
	}, []);

	useEffect(() => {
		if (!userId) return;

		// userId をフォームにセット
		form.setValue("user_id", userId);

		// 非同期関数で API を呼び出す
		const fetchRamen = async () => {
			try {
				const response = await fetch(getUrl(`/v1/ramen?user_id=${userId}`), {
					headers: {
						"Content-Type": "application/json",
					},
				});
				if (!response.ok) {
					console.error("APIエラー:", response.status);
					return;
				}
				const data = await response.json();
				console.log("取得したデータ:", data);
				setGallery(data);
				// 必要に応じて state などへの反映を行う
			} catch (error) {
				console.error("Fetchエラー:", error);
			}
		};

		fetchRamen();
	}, [userId, form]);

	const fileDelete = () => {
		setIsFile(false);
		form.setValue("file", null);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleClick = () => {
		fileDelete();
	};

	const onSubmit = async (data: Post) => {
		if (data.file === null) {
			throw new Error("ファイルが選択されていません");
		}
		console.log(data);
		const compressedFile = await compressImage(data.file);
		const formData = new FormData();

		// 必要なフィールドを FormData に追加
		formData.append("user_id", data.user_id.toString());
		formData.append("store_name", data.store_name);
		formData.append("name", data.ramen_name);
		formData.append("deliciousness_id", data.deliciousness_id.toString());
		formData.append("portion_id", data.portion_id.toString());
		formData.append("noodle_thickness_id", data.thick_id.toString());
		formData.append("noodle_texture_id", data.texture_id.toString());
		formData.append("soup_richness_id", data.soup_id.toString());

		// ファイルの追加
		if (compressedFile) {
			formData.append("file", compressedFile, compressedFile.name);
		}

		console.log("formData prepared");
		try {
			const response = await fetch(getUrl("/v1/ramen"), {
				method: "POST",

				body: formData, // Content-Type は自動的に設定されるので指定不要
			});
			// response の処理...
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="flex flex-col min-h-screen py-10 bg-gradient-to-t from-emerald-100 via-yellow-100 to-amber-100">
			{/* スマホサイズに制限するコンテナ */}
			<div className="w-full mx-auto">
				<div className="flex flex-col">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div
								className={`${isFile ? "hidden" : "flex flex-initial justify-evenly items-center"}`}
							>
								<img
									src="/ramen/IMG_9358.jpeg"
									alt="アイコン"
									className="w-24 h-24 object-cover rounded-full border-4 border-pink-600"
								/>
								<div className="flex flex-col items-center">
									<div className="p-2 font-extrabold text-gray-800">
										User Name
									</div>
									<Card className="flex items-center justify-center p-1 w-28 h-10 bg-gray-800 m-1 text-white text-center">
										雑誌印刷
									</Card>
									<FormField
										control={form.control}
										name="file"
										render={({ field }) => (
											<FormItem>
												<FormControl>
													<div className="relative">
														{/* カスタムボタンとして画像を表示 */}
														<label
															htmlFor="file-input"
															className="cursor-pointer w-20 h-20 bg-gray-200 rounded-full"
														>
															<Card className="flex items-center justify-center p-1 w-28 h-10 bg-gray-800 m-1 text-white text-center">
																投稿
															</Card>
														</label>

														{/* 実際のファイル入力は非表示 */}
														<Input
															id="file-input"
															type="file"
															accept="image/*"
															className="hidden"
															onChange={(e) => {
																const files = e.target.files;
																field.onChange(files);
																if (files?.length !== 0) {
																	setIsFile(true);
																}
															}}
														/>
													</div>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>

							{isFile ? (
								<>
									<FormField
										control={form.control}
										name="store_name"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-black">お店の名前</FormLabel>
												<FormControl>
													<Input placeholder="お店の名前" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="ramen_name"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-black">
													ラーメンの名前
												</FormLabel>
												<FormControl>
													<Input placeholder="ラーメンの名前" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="deliciousness_id"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-black">おいしさ</FormLabel>
												<FormControl>
													<Input
														type="range"
														min={1}
														max={5}
														placeholder="おいしさ"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="portion_id"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-black">量</FormLabel>
												<FormControl>
													<Input
														type="range"
														min={1}
														max={5}
														placeholder="量"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="thick_id"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-black">太さ</FormLabel>
												<FormControl>
													<Input
														type="range"
														min={1}
														max={5}
														placeholder="太さ"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="texture_id"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-black">麺の硬さ</FormLabel>
												<FormControl>
													<Input
														type="range"
														min={1}
														max={5}
														placeholder="コシ"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="soup_id"
										render={({ field }) => (
											<FormItem>
												<FormLabel className="text-black">
													あっさり・こってり
												</FormLabel>
												<FormControl>
													<Input
														type="range"
														min={1}
														max={5}
														placeholder="コッテリ"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<Button type="submit">Submit</Button>
									<Button onClick={handleClick}>キャンセル</Button>
								</>
							) : (
								<RamenGallery gallery={gallery} />
							)}
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}
