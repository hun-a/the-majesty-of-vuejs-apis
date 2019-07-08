const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./api");
const AWSXRay = require("aws-xray-sdk");

AWSXRay.config([AWSXray.plugins.EC2Plugin]);
AWSXRay.captureHTTPsGlobal(require("http"));

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.json("hello");
});

app.use(AWSXRay.express.openSegment("MajestyOfVue"));

app.use("/api", routes);

app.use(AWSXRay.express.closeSegment());

app.use((err, req, res, next) => {
  console.error(err);
  res.json(err);
});

module.exports = app;
