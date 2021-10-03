import mongoose, { Schema } from "mongoose";
import ILocation from "../interfaces/locations";


// Location Schema
const LocationSchema:Schema = new Schema({
	id: {type: Number, required:true, unique:true, index:true },
	name: {type: String, required:true},
	address: {type: String, required:true},
	city: {type: String, required:true},
	latitude: {type: Number, required:true},
	longitude: {type: Number, required:true},
	prices: { type: [{
		price: { type: Number, required:true },
		currency: {type: String, required:true},
		product_id: {type: String, required:true}
	}], required:true },
	products: { type: [{
		product_id: {type: String, required:true},
		points: { type: [{
			id:{type: Number, required:true},
			status:{type: String, required:true}
		}], required:true }
	}], required:true }
})

LocationSchema.index({id: 1}, {unique: true});

// Create index for avoiding duplicate documents
const Location = mongoose.model('Location', LocationSchema);
Location.collection.createIndex({ id: 1 }, {unique:true}); 
Location.syncIndexes();

export default mongoose.model<ILocation>('Location', LocationSchema);