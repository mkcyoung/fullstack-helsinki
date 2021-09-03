/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatient, {toNewEntry} from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getSafePatients());
});

router.get('/:id', (req, res) => {
    const patient = patientsService.findById(req.params.id);

    if (patient) {
      res.send(patient);
    } else {
      res.sendStatus(404);
    }
});

router.post('/:id/entries', (req, res) => {
  try {
      const patient = patientsService.findById(req.params.id);
      const newEntry = toNewEntry(req.body);
      if (patient && newEntry){
        const addedEntry = patientsService.addEntry(patient, newEntry);
        res.json(addedEntry);
      }
  } catch ({message}: unknown ) {

      res.status(400).send(message);
  }
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);

        const addedPatient = patientsService.addPatient(newPatient);
        res.json(addedPatient);
    } catch ({ message } : unknown ) {

        res.status(400).send(message);
    }
});

export default router;