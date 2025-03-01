"use client";

import { Ramen } from "@/components/Ramen";
import type { RamenGalleryList } from "@/types/RamenGallery";

type RamenGallerysProps = {
	gallery: RamenGalleryList;
};

export const RamenGallery = ({ gallery }: RamenGallerysProps) => {
	return (
		<div className="grid grid-cols-3 gap-0">
			{gallery.map((ramen) => (
				<Ramen imageInfo={ramen} key={ramen.id} />
			))}
		</div>
	);
};
