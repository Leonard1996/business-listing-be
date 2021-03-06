import "reflect-metadata";
require("dotenv").config();
import express = require("express");
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { UserRouter } from "./user/user.router";
import { createConnection } from "typeorm";
import { AuthenticationRouter } from "./authentication/authentication.router";
import { DocRouter } from "./doc/doc.router";
import { AttachmentRouter } from "./attachment/attachment.router";
import https = require("https");
import fs = require("fs");
import { BusinessRouter } from "./business/business.router";
var app = express();

createConnection()
  .then(async (connection) => {
    app.use(cors());
    app.use(bodyParser.json({ limit: "200mb" }));
    app.use(bodyParser.urlencoded({ limit: "200mb", extended: true }));
    //app.use(expressFormidable());

    // Doc routes
    DocRouter.configRoutes(app);

    // Authentication routes
    AuthenticationRouter.configRoutes(app);

    // User routes
    UserRouter.configRoutes(app);

    // Attachment routes
    AttachmentRouter.configRoutes(app);

    BusinessRouter.configRoutes(app);

    // get api version
    app.get(process.env.URL + "/version", (req, res) => {
      res.status(200).send({
        success: true,
        message: "the api call is successfull",
        body: {
          version: process.env.VERSION,
        },
      });
    });

    const port = process.env.PORT || 4500;

    if (process.env.SSL_LOCATION) {
      const privateKey = fs.readFileSync(process.env.SSL_LOCATION + "/privkey.pem", "utf8");
      const certificate = fs.readFileSync(process.env.SSL_LOCATION + "/cert.pem", "utf8");
      const ca = fs.readFileSync(process.env.SSL_LOCATION + "/chain.pem", "utf8");
      const credentials = {
        key: privateKey,
        cert: certificate,
        ca
      };
      const httpsServer = https.createServer(credentials, app);
      httpsServer.listen(port, () => {
        return console.log(`server is listening on ${port}`);
      });
    } else {
      app.listen(port, () => {
        return console.log(`server is listening on ${port}`);
      });
    }
  }).catch((error) => console.log(error));
