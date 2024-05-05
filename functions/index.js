const functions = require("firebase-functions");
const express = require("express");
const basicAuth = require("basic-auth-connect");
const path = require("path");
const app = express();

app.all(
  "/*",
  basicAuth(function (user, password) {
    return user === "username" && password === "password";
  })
);

const staticFilesPath = path.join(process.cwd(), "static");
console.log("Serving static files from:", staticFilesPath);

app.use(express.static(staticFilesPath));

exports.app = functions.https.onRequest(app);
