const functions = require("firebase-functions");
const express = require("express");

const admin = require("firebase-admin");
admin.initializeApp();

const app = express();

app.get("/:id", async (req, res) => {
  const snapshot = await admin.firestore()
      .collection("group").doc(req.params.id).get();

  const groupId = snapshot.id;
  const groupData = snapshot.data();

  res.status(200).send(JSON.stringify({id: groupId, ...groupData}));
});

app.post("/", async (req, res) => {
  const group = req.body;

  await admin.firestore().collection("group").add(group);

  res.status(201).send();
});

app.put("/:id", async (req, res) => {
  const body = req.body;

  await admin.firestore().collection("group").doc(req.params.id).update(body);

  res.status(200).send();
});

app.delete("/:id", async (req, res) => {
  await admin.firestore().collection("group").doc(req.params.id).delete();

  res.status(200).send();
});

exports.group = functions.https.onRequest(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });
