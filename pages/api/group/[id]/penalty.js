import db from '../../../../utils/db';
import admin from 'firebase-admin';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
        const body = req.body;
        const increaseBy = admin.firestore.FieldValue.increment(body.amount);
      
        await db.collection("group").doc(req.query.id).collection("members").doc(body.memberID).update({amount: increaseBy});
      
        res.status(200).send(JSON.stringify({status: "ok"}));
    } catch (e) {
      res.status(400).end();
    }
  }
}