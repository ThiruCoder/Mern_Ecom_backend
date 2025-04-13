import express from 'express';
import { getProjects } from './ProjectsFunction.js';

const router = express.Router();

router.get('/allproject', getProjects);

export { router };