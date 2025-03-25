import Contact from '../db/models/Сontact.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const createCont = async (contactData) => {
  const newContact = new Contact(contactData);
  await newContact.save();
  return newContact;
};

export const updateCont = async (contactId, updatedData) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    updatedData,
    { new: true },
  );
  return updatedContact;
};

export const deleteCont = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);
  return deletedContact;
};
