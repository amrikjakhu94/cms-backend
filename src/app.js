import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { connect } from './config/db';
import { restRouter } from './api';
const app = express();
app.use(cors());

const PORT = 8000;

//mongodb connection
connect();

app.use(express.json());
app.use(express.urlencoded({extended :true }));
app.use(logger('dev'));


app.use('/api',restRouter);

 app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = 'Invalid route';
    error.status = 404;
    next(error);
  });
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });
  

  app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
  });