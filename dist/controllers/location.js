"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.getLocations = exports.createLocation = void 0;
const location_1 = __importDefault(require("../models/location"));
const createLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { id, name, address, city, latitude, longitude, prices, products } = req.body;
    const location = new location_1.default({
        id, name, address, city, latitude, longitude, prices, products
    });
    try {
        const result = yield location
            .save();
        return res.status(201).json({
            location: result
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.code == 11000 ? "Duplicate id" : error,
            error
        });
    }
});
exports.createLocation = createLocation;
const getLocations = (req, res, next) => {
    console.log("Get locations called");
    location_1.default.find()
        .exec()
        .then(results => {
        console.log(results);
        return res.status(200).json({ Locations: results });
    }).catch(error => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};
exports.getLocations = getLocations;
const updateLocation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { location_id, new_product_price, product_id, new_location_name } = req.body;
    if (location_id) {
        try {
            const result = yield location_1.default.findOneAndUpdate({ 'id': location_id, 'prices._id': product_id }, {
                "$set": {
                    "prices.$.price": new_product_price,
                    "name": new_location_name
                }
            }, {
                new: true,
            });
            if (result) {
                return res.status(201).json({
                    location: result
                });
            }
            else {
                return res.status(500).json({
                    message: 'No location was founded with that id or product id',
                });
            }
        }
        catch (error) {
            return res.status(500).json({
                message: error,
                error
            });
        }
    }
    else {
        return res.status(500).json({
            message: 'No location_id was founded.',
        });
    }
});
exports.updateLocation = updateLocation;
const deleteLocation = (req, res, next) => {
    let { location_id } = req.body;
    location_1.default.deleteOne({ id: location_id })
        .then(result => {
        return res.status(201).json({
            result: result
        });
    }).catch(error => {
        return res.status(500).json({
            message: error,
        });
    });
};
exports.deleteLocation = deleteLocation;
exports.default = { getLocations: exports.getLocations, createLocation: exports.createLocation, updateLocation: exports.updateLocation, deleteLocation: exports.deleteLocation };
