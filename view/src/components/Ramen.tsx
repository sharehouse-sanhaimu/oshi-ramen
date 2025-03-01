"use client";

import { RamenModal } from "@/components/RamenModal";
import type { RamenGallery } from "@/types/RamenGallery";
import Image from "next/image";
import { useState } from "react";

type RamenGallerysProps = {
	imageInfo: RamenGallery;
};

export const Ramen = ({ imageInfo }: RamenGallerysProps) => {
	const [isOpenModal, setIsOpenModal] = useState(false);

	const handleOpenModal = () => setIsOpenModal(true);

	return (
		<>
			<button
				type="button"
				onClick={handleOpenModal}
				className="relative w-full pb-[100%] overflow-hidden cursor-pointer border-0 p-0 group"
			>
				<Image
					src={imageInfo.image}
					alt={imageInfo.name}
					fill
					className="object-cover"
				/>
				<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition duration-300" />
			</button>
			<RamenModal
				{...imageInfo}
				isOpenModal={isOpenModal}
				setIsOpenModal={setIsOpenModal}
			/>
		</>
	);
};
