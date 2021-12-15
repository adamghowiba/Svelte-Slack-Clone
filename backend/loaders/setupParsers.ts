const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
import express, { Router } from 'express';
import cors from 'cors';
const router = Router();

router.use(cors({ origin: 'http://localhost:3000', credentials: true }));
router.use(logger('dev'));
router.use(express.json());
router.use(express.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(express.static(path.join(__dirname, 'public')));

export default router;