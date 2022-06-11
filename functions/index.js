const functions = require("firebase-functions");
const express = require("express");

const admin = require("firebase-admin");
admin.initializeApp();

const app = express();

// Get all group data
app.get("/:id", async (req, res) => {
  const snapshot = await admin.firestore()
      .collection("group").doc(req.params.id).get();

  const groupId = snapshot.id;
  const groupData = snapshot.data();

  res.status(200).send(JSON.stringify({id: groupId, ...groupData}));
});

// Create new group
app.post("/", async (req, res) => {
  const body = req.body;

  const group = {
    groupName: body.groupName,
    members: {},
    icon: false,
    penaltySize: 50,
  };

  await admin.firestore().collection("group").add(group)
      .then(function(docRef) {
        res.status(201).send(JSON.stringify({id: docRef.id}));
      });
});

// Update data in collection
app.put("/:id", async (req, res) => {
  const body = req.body;

  await admin.firestore().collection("group").doc(req.params.id).update(body);

  res.status(200).send();
});

// New group member
app.post("/:id/members", async (req, res) => {
  const body = req.body;
  const snapshot = await admin.firestore()
      .collection("group").doc(req.params.id).get();

  const members = {
    members: {
      ...snapshot.data().members,
      [body.name]: 0,
    }};

  await admin.firestore().collection("group").doc(req.params.id)
      .update(members);

  res.status(200).send();
});

// Remove group member
app.delete("/:id/members", async (req, res) => {
  const body = req.body;

  const snapshot = await admin.firestore()
      .collection("group").doc(req.params.id).get();

  const members = {
    members: {
      ...snapshot.data().members,
    },
  };
  delete members.members[body.name];

  await admin.firestore().collection("group").doc(req.params.id)
      .update(members);

  res.status(200).send();
});

// Increase/Decrease amount for person
app.post("/:id/penalty", async (req, res) => {
  const body = req.body;

  const snapshot = await admin.firestore()
      .collection("group").doc(req.params.id).get();

  const members = {
    members: {
      ...snapshot.data().members,
    },
  };
  members.members[body.name] += body.amount;

  await admin.firestore().collection("group").doc(req.params.id)
      .update(members);

  res.status(200).send();
});

// Delete group
app.delete("/:id", async (req, res) => {
  await admin.firestore().collection("group").doc(req.params.id).delete();

  res.status(200).send();
});

exports.group = functions.https.onRequest(app);
