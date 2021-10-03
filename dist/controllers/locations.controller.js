"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocations = exports.updateLocations = exports.getLocations = exports.createLocation = void 0;
const location_1 = require("../models/location");
const Locations = [];
const createLocation = (req, res, next) => {
    console.log(req.body);
    const text = req.body.text; // making it  string type
    // const text = req.body.text; //typeScript is not allowing :any type
    const id = Math.random();
    const newLocation = new location_1.Location(id, text);
    Locations.push(newLocation);
    res.status(201).json({ message: 'Todo created successfully', createLocation: newLocation });
};
exports.createLocation = createLocation;
const getLocations = (req, res, next) => {
    res.status(200).json({ "Locations": Locations });
};
exports.getLocations = getLocations;
const updateLocations = (req, res, next) => {
    const todoId = req.params.id;
    const updatedText = req.body.text;
    const todoIndex = Locations.findIndex(x => x.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    Locations[todoIndex] = new location_1.Location(Locations[todoIndex].id, updatedText);
    res.status(201).json({ message: 'Todo updated successfully', updateTodo: Locations[todoIndex] });
};
exports.updateLocations = updateLocations;
const deleteLocations = (req, res, next) => {
    const todoId = req.params.id;
    const todoIndex = Locations.findIndex(x => x.id === todoId);
    if (todoIndex < 0) {
        throw new Error('Could not find todo!');
    }
    console.log(Locations[todoIndex].text, typeof todoIndex);
    const deletedData = { id: Locations[todoIndex].id, text: Locations[todoIndex].text };
    Locations.splice(todoIndex, 1);
    res.status(201).json({ message: `${deletedData.id}: ${deletedData.text} deleted successfully` });
};
exports.deleteLocations = deleteLocations;
