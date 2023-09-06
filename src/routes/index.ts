import { Application } from "express";
import autoresRoutes from "./autoresRoutes";
import livrosRoutes from "./livrosRoutes";

const route = (app: Application) => {
    app.use(
        livrosRoutes,
        autoresRoutes
    );
};

export default route;