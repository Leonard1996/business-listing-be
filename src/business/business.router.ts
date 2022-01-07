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
            AuthenticationMiddleware.checkJwtTokenOptional,
            BusinessController.list,
        ]);

        app.get("/businesses/:businessId", [
            AuthenticationMiddleware.checkJwtTokenOptional,
            AuthenticationMiddleware.checkIfFieldsAllowed,
            BusinessController.getById,
        ]);

        app.post("/businesses/:businessId/messages", [
            BusinessController.insertMessage,
        ]);

        app.delete("/businesses/:businessId", [
            AuthenticationMiddleware.checkJwtToken,
            BusinessController.delete,
        ]);

        app.post("/businesses/filter", [
            AuthenticationMiddleware.checkJwtTokenOptional,
            AuthenticationMiddleware.checkIfFieldsAllowed,
            BusinessController.filter,
        ]);
    };
}
