import ContactsModel, { Contacts } from "../model/contacts.model";

export function createContacts(input: Partial<Contacts>) {
  return ContactsModel.create(input);
}

export function findContactsById(id: string) {
  return ContactsModel.findById(id);
}

export function findContacts() {
  return ContactsModel.find({});
}

export function deleteContactsById(id: string) {
  return ContactsModel.findByIdAndDelete(id);
}
