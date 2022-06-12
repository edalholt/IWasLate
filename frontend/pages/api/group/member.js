import db from '../../../utils/db';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const body = req.body;
      const snapshot = await db.collection("group").doc(body.groupId).get();
    
      const members = {
        members: {
          ...snapshot.data().members,
          [body.name]: 0,
        }};
    
      await db.collection("group").doc(body.groupId).update(members);
    
      res.status(200).send(JSON.stringify({status: "member added"}));
    } catch (e) {
      res.status(400).end();
    }
  }
  if (req.method === 'DELETE') {
    try {
      const body = req.body;
      const snapshot = await db.collection("group").doc(body.groupId).get();
    
      const members = {
        members: {
          ...snapshot.data().members,
        },
      };
      delete members.members[body.name];
    
      await db.collection("group").doc(body.groupId).update(members);
    
      res.status(200).send(JSON.stringify({status: "member removed"}));
    } catch (e) {
      res.status(400).end();
    }
  }
}