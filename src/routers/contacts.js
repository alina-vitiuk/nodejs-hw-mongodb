import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactSchema,
  updateContactSchema,
} from '../validation/contactValidation.js';
import { isValidID } from '../middlewares/isValidID.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', isValidID, ctrlWrapper(getContact));
router.post(
  '/',
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContact),
);
router.patch(
  '/:contactId',
  isValidID,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact),
);
router.delete('/:contactId', isValidID, ctrlWrapper(deleteContact));

export default router;
