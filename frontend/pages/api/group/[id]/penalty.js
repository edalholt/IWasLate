import db from '../../../../utils/db';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
        const body = req.body;

        const snapshot = await db.collection("group").doc(req.query.id).get();
      
        const members = {
          members: {
            ...snapshot.data().members,
          },
        };
        members.members[body.name] += body.amount;
      
        await db.collection("group").doc(req.query.id)
            .update(members);
      
        res.status(200).send(JSON.stringify({status: "ok"}));
    } catch (e) {
      res.status(400).end();
    }
  }
}