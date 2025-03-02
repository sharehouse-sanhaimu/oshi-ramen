"use client";

import { useState } from "react";
import {Button } from "@/components/ui/button";
import { getMagazineUrl } from "@/lib/utils";

type MagazineModalProps = {
    userId: number | null;
};

export function MagazineModal( { userId }: MagazineModalProps ) {
	const [isOpen, setIsOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// const openModal = async () => {
	// 	setIsOpen(true);
	// 	setIsLoading(true);
	// 	try {
	// 		const response = await fetch(getMagazineUrl(`make_magazine?user_id=${userId}`));
	// 		if (!response.ok) throw new Error("APIエラー");
	// 		const data = await response.json();
	// 		setImageUrl(data.url);
	// 	} catch (error) {
	// 		console.error(error);
	// 	} finally {
	// 		setIsLoading(false);
	// 	}
	// };

    const printMagazine = async () => {
        try {
            const response = await fetch(getMagazineUrl(`make_magazine?user_id=${userId}`));
            if (!response.ok) throw new Error("APIエラー");
            const data = await response.json();
            setImageUrl(data.url);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

	const closeModal = () => {
		setIsOpen(false);
		setImageUrl(null);
	};

	// キーボード操作（Enter またはスペースキー）でも閉じるようにする
	const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "Enter" || e.key === " ") {
			closeModal();
		}
	};

	return (
		<>
			<Button
				type="button"
				onClick={printMagazine}
				className="flex items-center rounded-2xl justify-center p-1 w-28 h-10 bg-gray-800 m-1 text-white text-center"
			>
				雑誌印刷
			</Button>

			{isOpen && (
				<div className="fixed inset-0 flex items-center justify-center z-50">
					{/* 背景オーバーレイ（キーボード操作も可能に） */}
					<div
						className="absolute inset-0 bg-black opacity-50"
						onClick={closeModal}
						onKeyDown={handleOverlayKeyDown}
						role="button"
						tabIndex={0}
					/>
					<div className="relative bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
						<button
							type="button"
							className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
							onClick={closeModal}
						>
							✕
						</button>
						<h2 className="text-xl font-bold mb-4">画像プレビュー</h2>
						{isLoading ? (
							<p>読み込み中...</p>
						) : imageUrl ? (
							<img
								src={imageUrl}
								alt="取得した画像"
								className="w-full h-auto rounded"
							/>
						) : (
							<p>画像がありません。</p>
						)}
					</div>
				</div>
			)}
		</>
	);
}
