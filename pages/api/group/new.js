import db from '../db';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const body = req.body;

      const group = {
          groupName: body.groupName,
          icon: false,
          penaltySize: 50,
      };
      
      await db.collection("group").add(group)
          .then(function(docRef) {
              res.status(201).send(JSON.stringify({id: docRef.id}));
          });
    } catch (e) {
      res.status(400).end();
    }
  }
}