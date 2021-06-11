import express from 'express';
import { fetchUrls, UrlAddition,UrlUpdate } from '../controllers/urlshortner';

const indexRouter = express.Router();

indexRouter.get('/url',fetchUrls);

indexRouter.post('/url/add',UrlAddition)

indexRouter.put('/url/update',UrlUpdate)

export default indexRouter;