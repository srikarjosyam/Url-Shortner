import express from 'express';
import { fetchUrls, UrlAddition } from '../controllers/urlshortner';

const indexRouter = express.Router();

indexRouter.get('/url',fetchUrls);

indexRouter.post('/url/add',UrlAddition)

export default indexRouter;