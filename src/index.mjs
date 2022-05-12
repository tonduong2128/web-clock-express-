import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import express from 'express';
import { engine } from 'express-handlebars';
import db from './database/db.mjs';
import routes from './routes/index.mjs';
import functionHelper from './util/functionHelper.mjs';

const app = express()

db.connect();

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 

app.use(cookieParser())
app.use('/', express.static('./src/views/'));
app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: functionHelper
}));
app.set('view engine', '.hbs');
app.set('views', './src/views');

routes(app);

app.listen(3000);