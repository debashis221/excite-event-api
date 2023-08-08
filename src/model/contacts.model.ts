import { getModelForClass, prop } from "@typegoose/typegoose";

export class Contacts {
    @prop({required: true})
    name: string

    @prop({required: true})
    email: string

    @prop({required: true})
    message: string
}

const ContactsModel = getModelForClass(Contacts, {
  schemaOptions: {
    timestamps: true,
  },
});

export default ContactsModel;
