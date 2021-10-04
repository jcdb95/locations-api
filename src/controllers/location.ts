import { NextFunction, RequestHandler, Request, Response } from 'express';
import Location from '../models/location';



export const createLocation:RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

	res.set('Access-Control-Allow-Origin', '*');

    let { id, name, address, city, latitude, longitude, prices, products } = req.body;

    const location = new Location({
        id, name, address, city, latitude, longitude, prices, products
    });


    try {
		const result = await location
			.save();
		return res.status(201).json({
			location: result
		});
	} catch (error: any) {
		console.log(error)
		return res.status(500).json({
			message: error.code == 11000 ? "Duplicate id" : error,
			error
		});
	}
};

export const getLocations:RequestHandler = (req: Request, res: Response, next: NextFunction) => {

	res.set('Access-Control-Allow-Origin', '*');

	console.log("Get locations called")
	Location.find()
	.exec()
	.then(results => {
		console.log(results)
		return res.status(200).json({Locations: results});
	}).catch(error =>{
		return res.status(500).json({
			message: error.message,
			error
		});
	})
 };

export const updateLocation:RequestHandler = async (req: Request, res: Response, next: NextFunction) => {

	res.set('Access-Control-Allow-Origin', '*');
	
	let {location_id, new_product_price, product_id, new_location_name } =  req.body;

	if(location_id) {
		try {
			const result = await Location.findOneAndUpdate({ 'id': location_id , 'prices._id': product_id},
				{ 
					"$set": {
						"prices.$.price": new_product_price,
						"name":new_location_name
					}
				},
				{
					new: true,
				}
			)
			if(result){
				return res.status(201).json({
					location: result
				});
			} else {
				return res.status(500).json({
					message: 'No location was founded with that id or product id',
				});
			}
		} catch (error) {
			return res.status(500).json({
				message: error,
				error
			});
			
		}
	} else {
		return res.status(500).json({
			message: 'No location_id was founded.',
		});
	}
};

export const deleteLocation:RequestHandler = (req: Request, res: Response, next: NextFunction) => {

	res.set('Access-Control-Allow-Origin', '*');


	let { location_id } = req.body;

	Location.deleteOne({ id: location_id })
	.then(result => {
		return res.status(201).json({
			result: result
		});
	}).catch(error => {
		return res.status(500).json({
			message: error,
		});
	})
}


export default { getLocations, createLocation, updateLocation, deleteLocation }