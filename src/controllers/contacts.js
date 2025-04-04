import httpErrors from 'http-errors';
import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createCont,
  updateCont,
  deleteCont,
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getContacts = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId: req.user.id,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId, req.user.id);
  if (!contact) {
    throw httpErrors(404, 'Contact not found');
  }

  if (contact.userId.toString() !== req.user.id.toString()) {
    throw new createHttpError.NotFound('Student not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContact = async (req, res) => {
  const contactData = {
    ...req.body,
    userId: req.user.id,
  };
  const newContact = await createCont(contactData);
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
};

export const updateContact = async (req, res) => {
  const updatedContact = await updateCont(
    req.params.contactId,
    req.body,
    req.user.id,
  );
  if (!updatedContact) {
    throw httpErrors(404, 'Contact not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const deleteContact = async (req, res) => {
  const deletedContact = await deleteCont(req.params.contactId, req.user.id);
  if (!deletedContact) {
    throw httpErrors(404, 'Contact not found');
  }
  res.status(204).send();
};
