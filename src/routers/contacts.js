import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', ctrlWrapper(getContact));
router.post('/', jsonParser, ctrlWrapper(createContact));
router.patch('/:contactId', jsonParser, ctrlWrapper(updateContact));
router.delete('/:contactId', ctrlWrapper(deleteContact));

export default router;
