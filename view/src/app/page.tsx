"use client";

import { RamenGallery } from "@/components/RamenGallery";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { initialRamenList } from "@/lib/mockData";
import { postSchema } from "@/types/post";
import type { Post } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export default function Home() {
	const [userId, setUserId] = useState<string | null>(null);
	const [isFile, setIsFile] = useState<boolean>(false);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const form = useForm<Post>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			user_id: "",
			store_name: "",
			ramen_name: "",
			file: undefined,
			delicious: 3,
			portion: 3,
			thick: 3,
			texture: 3,
			soup: 3,
		},
	});

	useEffect(() => {
		const userID = localStorage.getItem("userID");
		if (userID) {
			setUserId(userID);
		} else {
			setUserId(null);
		}
	}, []);

	useEffect(() => {
		if (userId) {
			form.setValue("user_id", userId);
		}
	}, [userId, form]);

	const onSubmit = (data: Post) => {
		console.log(data);
	};

	const fileDelete = () => {
		setIsFile(false);
		form.setValue("file", undefined);
		if (fileInputRef.current) {
			fileInputRef.current.value = "";
		}
	};

	const handleClick = () => {
		fileDelete();
	};

	console.log(form.watch("file"));

	return (
		<div className="flex flex-col min-h-screen py-10 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-50">
			{/* スマホサイズに制限するコンテナ */}
			<div className="max-w-sm w-full mx-auto">
				<div className="flex flex-col">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<div className={`${isFile ? "hidden" : ""}`}>
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
														className="cursor-pointer"
													>
														<img
															src="/ramen/IMG_9358.jpeg"
															alt="アイコン"
															className="w-20 h-20 object-cover rounded-full border-4 border-pink-600"
														/>
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

							{isFile ? (
								<>
									<FormField
										control={form.control}
										name="store_name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Store Name</FormLabel>
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
												<FormLabel>Ramen Name</FormLabel>
												<FormControl>
													<Input placeholder="ラーメンの名前" {...field} />
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="delicious"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Delicious</FormLabel>
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
										name="portion"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Portion</FormLabel>
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
										name="thick"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Thick</FormLabel>
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
										name="texture"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Texture</FormLabel>
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
										name="soup"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Soup</FormLabel>
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
								<RamenGallery gallery={initialRamenList} />
							)}
						</form>
					</Form>
				</div>
			</div>
		</div>
	);
}
