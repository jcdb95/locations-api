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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const location_1 = __importDefault(require("./routes/location"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config/config"));
require("dotenv/config");
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use((0, express_1.json)());
app.use((0, express_basic_auth_1.default)({
    users: {
        'jcdb': 'qqwweerrttyy12@@'
    }
}));
app.use('/locations', location_1.default);
/** Rules of our API */
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
/** Error handling */
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: err.message });
});
/** Database connection */
mongoose_1.default.connect(config_1.default.DatabaseUrl, config_1.default.MongoOptions)
    .then(() => {
    console.log("Connected to Database");
})
    .catch(error => {
    console.log("Error:", error);
});
app.listen(port);
