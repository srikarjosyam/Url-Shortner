import logger from 'morgan';
import express from 'express';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index';
import staticRouter  from './routes/staticRouter';
import path from 'path';
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../build')));
app.use(cookieParser());
app.use('/v1', indexRouter);
app.use('/st/',staticRouter)

export default app;