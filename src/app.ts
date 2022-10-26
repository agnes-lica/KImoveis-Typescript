import "reflect-metadata";
import "express-async-errors";
import express from "express";

import handleErrorMiddleware from "./middlewares/handleError.middleware";

import routeLogin from "./routes/login.routes";
import routeUsers from "./routes/users.routes";
import routeCategories from "./routes/categories.routes";
import routeProperties from "./routes/properties.routes";
import routeSchedules from "./routes/schedules.routes";

const app = express();
app.use(express.json());

app.use("/users", routeUsers);
app.use("/login", routeLogin);
app.use("/categories", routeCategories);
app.use("/properties", routeProperties);
app.use("/schedules", routeSchedules);

app.use(handleErrorMiddleware);

export default app;
