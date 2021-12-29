import * as express from "express";
import { ConnectionIsNotSetError } from "typeorm";
import { UploadMiddleware } from "../attachment/middlewares/upload.middleware";
import { AuthenticationMiddleware } from "../authentication/middlewares/authentication.middleware";
import { BusinessController } from "./controllers/business.controller";


export class BusinessRouter {
    static configRoutes = (app: express.Application) => {
        app.post("/business", [
            AuthenticationMiddleware.checkJwtToken,
            UploadMiddleware.validateFileUpload('file', ["jpg", "jpeg", "png"], 11),
            BusinessController.insert,
        ]);

        app.get("/businesses", [
            AuthenticationMiddleware.checkJwtToken,
            BusinessController.list,
        ]);

        app.get("/businesses/:businessId", [
            AuthenticationMiddleware.checkJwtToken,
            BusinessController.getById,
        ]);

        app.post("/businesses/:businessId/messages", [
            AuthenticationMiddleware.checkJwtToken,
            BusinessController.insertMessage,
        ]);

        app.delete("/businesses/:businessId", [
            AuthenticationMiddleware.checkJwtToken,
            BusinessController.delete,
        ]);
    };
}
