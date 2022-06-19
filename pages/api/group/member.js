import db from '../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const body = req.body;

       const memberData = {
          name: body.name,
          amount: 0,
      };
      
      await db.collection("group").doc(body.groupId).collection("members").add(memberData)
          .then(function(docRef) {
            res.status(200).send(JSON.stringify({memberRef: docRef.id}));
          });
    } catch (e) {
      res.status(400).end();
    }
  }
  if (req.method === 'DELETE') {
    try {
      const body = req.body;
      await db.collection("group").doc(body.groupID).collection("members").doc(body.memberID).delete();
      res.status(200).send(JSON.stringify({status: "ok"}));
    } catch (e) {
      res.status(400).end();
    }
  }
}