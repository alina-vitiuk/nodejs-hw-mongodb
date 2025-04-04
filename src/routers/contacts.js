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
import auth from '../middlewares/auth.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/', auth, ctrlWrapper(getContacts));
router.get('/:contactId', auth, isValidID, ctrlWrapper(getContact));
router.post(
  '/',
  auth,
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContact),
);
router.patch(
  '/:contactId',
  auth,
  isValidID,
  jsonParser,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContact),
);
router.delete('/:contactId', auth, isValidID, ctrlWrapper(deleteContact));

export default router;
