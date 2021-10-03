import { Document } from "mongoose";

export default interface ILocation extends Document {
		id: number,
		name: string,
		address: string,
		city: string,
		latitude: number,
		longitude: number,
		prices: Array<{
			price: number,
			currency: string,
			product_id: string
		}>,
		products: Array<{ 
			product_id: string 
			points: Array<{
				id:number,
				status:string
			}> 
		}>
}