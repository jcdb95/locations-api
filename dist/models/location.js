"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// Location Schema
const LocationSchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true, index: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    prices: { type: [{
                price: { type: Number, required: true },
                currency: { type: String, required: true },
                product_id: { type: String, required: true }
            }], required: true },
    products: { type: [{
                product_id: { type: String, required: true },
                points: { type: [{
                            id: { type: Number, required: true },
                            status: { type: String, required: true }
                        }], required: true }
            }], required: true }
});
LocationSchema.index({ id: 1 }, { unique: true });
// Create index for avoiding duplicate documents
const Location = mongoose_1.default.model('Location', LocationSchema);
Location.collection.createIndex({ id: 1 }, { unique: true });
Location.syncIndexes();
exports.default = mongoose_1.default.model('Location', LocationSchema);
