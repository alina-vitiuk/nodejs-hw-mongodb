import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import ContactsRouter from './routers/contacts.js';

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

  app.use('/contacts', ContactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  return app;
};

export default setupServer;
