import { getModelForClass, prop } from "@typegoose/typegoose";

export class Gallery {
  @prop({ required: true })
  image: string;
}

const GalleryModel = getModelForClass(Gallery, {
  schemaOptions: {
    timestamps: true,
  },
});

export default GalleryModel;
