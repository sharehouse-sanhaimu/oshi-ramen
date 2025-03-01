"use client";

import { postSchema } from "@/types/post";
import type { Post } from "@/types/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { type SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { getAuth } from "@/lib/firebaseClient";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Home() {
	const form = useForm<Post>({
		resolver: zodResolver(postSchema),
		defaultValues: {
			user_id: "",
			store_name: "",
			file: undefined,
			ramen_name: "",
			delicious: 3,
			portion: 3,
			thick: 3,
			texture: 3,
			soup: 3, // 例えば range の場合は 0 など適切な値
		},
	});

	const [userId, setUserId] = useState<string | null>(null);

	useEffect(() => {
		const auth = getAuth();
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserId(user.uid);
			} else {
				setUserId(null);
			}
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (userId) {
			form.setValue("user_id", userId);
		}
	}, [userId, form]);

	const onSubmit = (data: Post) => {
		console.log(data);
	};

	const fileValue = form.watch("file");

	console.log(form.watch());

	return (
		<>
			<div className="flex flex-col min-h-screen px-10 py-10 bg-gradient-to-t from-gray-300 via-gray-200 to-gray-50">
				<div className="flex flex-col items-center justify-center space-y-6">
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
							<FormField
								control={form.control}
								name="file"
								render={({ field }) => (
									<FormItem>
										<FormLabel>file</FormLabel>
										<FormControl>
											<Input
												type="file"
												onChange={(e) => field.onChange(e.target.files)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div>
								{fileValue ? (
									<div>ファイルがアップロードされました</div>
								) : (
									<div>まだファイルがアップロードされていません</div>
								)}
							</div>

							<FormField
								control={form.control}
								name="store_name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Store Name</FormLabel>
										<FormControl>
											<Input placeholder="お店の名前" {...field} />
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
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
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
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
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
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
											<Input type="range" min={1} max={5} placeholder="量" {...field} />
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
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
											<Input type="range" min={1} max={5} placeholder="太さ" {...field} />
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
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
											<Input type="range" min={1} max={5} placeholder="コシ" {...field} />
										</FormControl>
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
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
										{/* <FormDescription>
								This is your public display name.
							</FormDescription> */}
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit">Submit</Button>
						</form>
					</Form>
				</div>
			</div>
		</>
	);
}
