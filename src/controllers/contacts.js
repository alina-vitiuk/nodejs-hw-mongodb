import httpErrors from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createCont,
  updateCont,
  deleteCont,
} from '../services/contacts.js';

export const getContacts = async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw httpErrors(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContact = async (req, res, next) => {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;
    const contactData = { name, phoneNumber, email, isFavourite, contactType };
    const newContact = await createCont(contactData);
    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (err) {
    next(err);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const updatedContact = await updateCont(req.params.contactId, req.body);
    if (!updatedContact) {
      throw httpErrors(404, 'Contact not found');
    }
    res.json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const deletedContact = await deleteCont(req.params.contactId);
    if (!deletedContact) {
      throw httpErrors(404, 'Contact not found');
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
