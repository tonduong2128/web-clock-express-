import homeRoute_fe from "./homeRoute_fe.mjs";
import homeRoute_be from "./homeRoute_be.mjs";

export default function (app) {
  app.use("/", homeRoute_fe);
  app.use("/admin", homeRoute_be);
}
