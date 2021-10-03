import * as dotenv from 'dotenv';

dotenv.config();

export default {
	DatabaseUrl: process.env.DB_CONNECTION,
	MongoOptions:{
		useUnifiedTopology:true,
		useNewUrlParser:true,
		socketTimeoutMS:30000,
		keepAlive:true,
		autoIndex: false,
		retryWrites: false,
	}
}