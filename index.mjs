import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import { engine } from "express-handlebars";
import db from "./src/database/db.mjs";
import routes from "./src/routes/index.mjs";
import functionHelper from "./src/util/functionHelper.mjs";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// try {
//   db.connect();
// } catch (error) {
//   app.use("", (req, res) => {
//     res.json({ message: 0 });
//     return;
//   });
// }

app.set("view engine", ".hbs");
app.set("views", "./src/views");

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    helpers: functionHelper,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use("/", express.static("./src/views/"));

app.use("", (req, res) => {
  res.json({ message: 2 });
});

routes(app);

app.listen(3000);
