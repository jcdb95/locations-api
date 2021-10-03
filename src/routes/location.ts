import { Router } from 'express';
import { getLocations, createLocation, updateLocation, deleteLocation } from '../controllers/location';

const router = Router();

router.post('/', createLocation);
router.get('/', getLocations);
router.patch('/', updateLocation);
router.delete('/', deleteLocation);

export default router;