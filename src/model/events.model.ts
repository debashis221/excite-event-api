import { getModelForClass, prop } from "@typegoose/typegoose";

export class Events {
  @prop({ required: true })
  name: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  date: Date;

  @prop({ type: [Number], index: "2dsphere" })
  location: [number, number];

  @prop({ required: true })
  image: string;

  @prop({ required: true })
  bookurl: string;

  @prop({ required: true })
  address: string;

  @prop()
  youtube: string;
}

const EventsModel = getModelForClass(Events, {
  schemaOptions: {
    timestamps: true,
  },
});

export default EventsModel;
