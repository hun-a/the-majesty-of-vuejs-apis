const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./api");
const AWSXRay = require("aws-xray-sdk");
const logger = require("./lib/logger");

AWSXRay.config([AWSXRay.plugins.EC2Plugin]);
AWSXRay.captureHTTPsGlobal(require("http"));

const app = express();

app.use(morgan("short", { stream: logger.stream }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.json("hello");
});

app.get("/error", (req, res, next) => {
  next(new Error("hi"));
});

app.use(AWSXRay.express.openSegment("MajestyOfVue"));

app.use("/api", routes);

app.use((err, req, res, next) => {
  res.json(err);
  logger.error(err);
});

app.use(AWSXRay.express.closeSegment());

// module.exports = http.createServer(app);
module.exports = app;
