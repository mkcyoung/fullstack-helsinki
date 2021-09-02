/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getSafePatients());
});

router.post('/', (req, res) => {
    const newPatient = req.body;
    res.send(patientsService.addPatient(newPatient));
});

export default router;