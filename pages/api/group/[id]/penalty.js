import db from '../../db';
import admin from 'firebase-admin';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
        const body = req.body;
        const increaseAmount = admin.firestore.FieldValue.increment(body.amount || 0);
        const increaseMinutes = admin.firestore.FieldValue.increment(body.minutes || 0);
        if(!(body.amount || body.minutes)){
          res.status(400).end();
        }
      
        await db.collection("group").doc(req.query.id).collection("members").doc(body.memberID).update({amount: increaseAmount, minutes: increaseMinutes});
      
        res.status(200).send(JSON.stringify({status: "ok"}));
    } catch (e) {
      res.status(400).end();
    }
  }
}