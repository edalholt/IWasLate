import db from '../../../utils/db';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      const snapshot = await db.collection('group').doc(id).get();
      const membSnapshot = await db.collection('group').doc(id).collection("members").get();
      
      const groupId = snapshot.id;
      const groupData = snapshot.data();
    
      res.status(200).send(JSON.stringify({id: groupId, ...groupData, memberData: membSnapshot.docs.map(doc => Object.assign({}, {id: doc.id}, doc.data()))}));
    } catch (e) {
      res.status(400).end();
    }
  }
  else if (req.method === 'DELETE') {
    try {
      const { id } = req.query;
      const snapshot = await db.collection('group').doc(id).delete();
      res.status(200).send(JSON.stringify({status: "deleted"}));
    } catch (e) {
      res.status(400).end();
    }
  }
}