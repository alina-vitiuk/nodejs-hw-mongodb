import Contact from '../db/models/Сontact.js';

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (contactId) => {
  return await Contact.findById(contactId);
};

export const index = async () => {
  return { hello: 'world' };
};
