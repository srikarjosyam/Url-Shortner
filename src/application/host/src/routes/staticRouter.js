import express from 'express';
import { RedirectUrl } from '../controllers/staticController';

const staticRouter = express.Router();

staticRouter.get(/^\/(.*)\/?$/i,RedirectUrl)

export default staticRouter;