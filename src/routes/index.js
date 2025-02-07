import express from 'express';
import TranslateController from '../controllers/translateController.js';

const router = express.Router();
const translateController = new TranslateController();

export function setRoutes(app) {
    router.post('/translate', translateController.translateXml);
    router.post('/beautify', translateController.beautifyXml);
    
    app.use('/api', router);
}