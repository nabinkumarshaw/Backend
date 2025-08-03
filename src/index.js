
import connectDb from '../db/index.js';
import dotenv from 'dotenv';
import app from './app.js';
dotenv.config();


connectDb();