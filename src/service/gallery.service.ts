import GalleryModel, { Gallery } from "../model/gallery.model";

export function createGallery(input: Partial<Gallery>) {
  return GalleryModel.create(input);
}
export function getGallery() {
  return GalleryModel.find().sort({ createdAt: -1 });
}

export function deleteGallery(id: string) {
  return GalleryModel.findByIdAndDelete(id);
}
