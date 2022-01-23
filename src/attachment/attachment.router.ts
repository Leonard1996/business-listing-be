import * as express from "express";
import { UploadMiddleware } from "./middlewares/upload.middleware";
import { AttachmentController } from "./controllers/attachment.controller";
import { AuthenticationMiddleware } from "../authentication/middlewares/authentication.middleware";

export class AttachmentRouter {

    static configRoutes = (app: express.Application) => {

        app.post("/attachments/upload", [
            UploadMiddleware.validateFileUpload('file', ["jpg", "jpeg", "png", "gif"], 10),
            AttachmentController.upload
        ]);

        app.delete("/attachments/:attachmentId/businesses/:businessId", [
            AuthenticationMiddleware.checkJwtToken,
            AttachmentController.delete
        ]);
    }
}