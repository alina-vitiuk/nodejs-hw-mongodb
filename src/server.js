import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getContacts, getContact } from './controllers/contacts.js';

const setupServer = () => {
  const app = express();

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/contacts', getContacts);

  app.get('/contacts/:contactId', getContact);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  return app;
};

export default setupServer;
