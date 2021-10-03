"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const locations_controller_1 = require("../controllers/locations.controller");
const router = (0, express_1.Router)();
router.post('/', locations_controller_1.createLocation); // CREATE Route
router.get('/', locations_controller_1.getLocations);
router.patch('/:id', locations_controller_1.updateLocations);
router.delete('/:id', locations_controller_1.deleteLocations);
exports.default = router;
