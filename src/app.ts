import express, {Request, Response, NextFunction, json} from 'express';
import LocationRoutes from './routes/location'; 
import mongoose  from 'mongoose';
import config from './config/config';
import cors from 'cors';
import 'dotenv/config'

const app = express();
const port = process.env.PORT || 3000

app.use(json());  

app.use('api/locations', LocationRoutes);


app.get('api/auth', (req: Request, res: Response) =>{
    let {user, pass} = req.body;
    if(user === 'jcdb' && pass === 'qqwweerrttyy12@@'){
		return res.status(200).json({auth: true});
    } else {
		return res.status(501).json({auth: false});
    }
});

app.use(cors())

/** Rules of our API */
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    res.header('Content-Type: application/json');
    
    if (req.method == 'OPTIONS') {
        res.header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS");
        return res.status(200).json({});
    }

    next();
});

/** Error handling */
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
	res.status(500).json({message: err.message});
});

/** Database connection */
mongoose.connect(config.DatabaseUrl!, config.MongoOptions,)
    .then(()=>{
        console.log("Connected to Database")
    })
    .catch(error=>{
        console.log("Error:", error)
    })

app.listen(port);