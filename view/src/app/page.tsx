"use client";

import { RamenGallery } from "@/components/RamenGallery";
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
import type { RamenGalleryList } from "@/types/RamenGallery";
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
		form.setValue("user_id", userId);
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
				setGallery(data);
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
		const compressedFile = await compressImage(data.file);
		const formData = new FormData();

		formData.append("user_id", data.user_id.toString());
		formData.append("store_name", data.store_name);
		formData.append("name", data.ramen_name);
		formData.append("deliciousness_id", data.deliciousness_id.toString());
		formData.append("portion_id", data.portion_id.toString());
		formData.append("noodle_thickness_id", data.thick_id.toString());
		formData.append("noodle_texture_id", data.texture_id.toString());
		formData.append("soup_richness_id", data.soup_id.toString());

		if (compressedFile) {
			formData.append("file", compressedFile, compressedFile.name);
		}

		try {
			const response = await fetch(getUrl("/v1/ramen"), {
				method: "POST",
				body: formData,
			});
			window.location.reload();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-t from-emerald-200 via-yellow-200 to-amber-200 flex items-center justify-center py-10 px-4">
			<div className="w-full max-w-3xl mx-auto">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
						{/* ファイル選択エリア */}
						<div
							className={`${
								isFile
									? "hidden"
									: "flex flex-col sm:flex-row justify-evenly items-center bg-white p-8 rounded-2xl shadow-2xl transition-all duration-300"
							}`}
						>
							<img
								src="/ramen/IMG_9358.jpeg"
								alt="アイコン"
								className="w-28 h-28 object-cover rounded-full border-4 border-pink-500 hover:scale-105 transition-transform duration-200"
							/>
							<div className="flex flex-col items-center mt-4 sm:mt-0">
								<div className="mb-2 font-extrabold text-gray-800 text-2xl tracking-wide">
									User Name
								</div>
								<Card className="flex items-center justify-center p-2 w-36 h-12 bg-gray-800 m-2 text-white text-center rounded-lg shadow-md">
									雑誌印刷
								</Card>
								<FormField
									control={form.control}
									name="file"
									render={({ field }) => (
										<FormItem className="w-full">
											<FormControl>
												<div className="relative">
													<label
														htmlFor="file-input"
														className="cursor-pointer inline-block px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full text-white font-semibold shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
													>
														投稿
													</label>
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
											<FormMessage className="mt-1 text-sm text-red-500" />
										</FormItem>
									)}
								/>
							</div>
						</div>

						{/* フォーム入力エリア */}
						{isFile ? (
							<div className="max-w-xl mx-auto bg-white p-10 rounded-2xl shadow-2xl">
								<div className="space-y-6">
									<FormField
										control={form.control}
										name="store_name"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="mb-2 font-semibold text-gray-700">
													お店の名前
												</FormLabel>
												<FormControl>
													<Input
														placeholder="お店の名前"
														{...field}
														className="w-full text-gray-800 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
													/>
												</FormControl>
												<FormMessage className="mt-1 text-sm text-red-500" />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="ramen_name"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="mb-2 font-semibold text-gray-700">
													ラーメンの名前
												</FormLabel>
												<FormControl>
													<Input
														placeholder="ラーメンの名前"
														{...field}
														className="w-full text-gray-800 border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
													/>
												</FormControl>
												<FormMessage className="mt-1 text-sm text-red-500" />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="deliciousness_id"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="mb-2 font-semibold text-gray-700">
													おいしさ
												</FormLabel>
												<FormControl>
													<Input
														type="range"
														min={1}
														max={5}
														placeholder="おいしさ"
														{...field}
														className="w-full accent-indigo-500"
													/>
												</FormControl>
												<FormMessage className="mt-1 text-sm text-red-500" />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="portion_id"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="mb-2 font-semibold text-gray-700">
													量
												</FormLabel>
												<FormControl>
													<Input
														type="range"
														min={1}
														max={5}
														placeholder="量"
														{...field}
														className="w-full accent-indigo-500"
													/>
												</FormControl>
												<FormMessage className="mt-1 text-sm text-red-500" />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="thick_id"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="mb-2 font-semibold text-gray-700">
													太さ
												</FormLabel>
												<FormControl>
													<Input
														type="range"
														min={1}
														max={5}
														placeholder="太さ"
														{...field}
														className="w-full accent-indigo-500"
													/>
												</FormControl>
												<FormMessage className="mt-1 text-sm text-red-500" />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="texture_id"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="mb-2 font-semibold text-gray-700">
													麺の硬さ
												</FormLabel>
												<FormControl>
													<Input
														type="range"
														min={1}
														max={5}
														placeholder="コシ"
														{...field}
														className="w-full accent-indigo-500"
													/>
												</FormControl>
												<FormMessage className="mt-1 text-sm text-red-500" />
											</FormItem>
										)}
									/>

									<FormField
										control={form.control}
										name="soup_id"
										render={({ field }) => (
											<FormItem className="flex flex-col">
												<FormLabel className="mb-2 font-semibold text-gray-700">
													あっさり・こってり
												</FormLabel>
												<FormControl>
													<Input
														type="range"
														min={1}
														max={5}
														placeholder="コッテリ"
														{...field}
														className="w-full accent-indigo-500"
													/>
												</FormControl>
												<FormMessage className="mt-1 text-sm text-red-500" />
											</FormItem>
										)}
									/>
								</div>

								<div className="flex justify-between mt-10">
									<Button
										type="submit"
										className="w-24 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-all duration-200 shadow-lg"
									>
										Submit
									</Button>
									<Button
										onClick={handleClick}
										className="w-24 py-3 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400 transition-all duration-200 shadow-lg"
									>
										キャンセル
									</Button>
								</div>
							</div>
						) : (
							<RamenGallery gallery={gallery} />
						)}
					</form>
				</Form>
			</div>
		</div>
	);
}
