export default async (req, res) => {
    res.status(200).send(JSON.stringify({status: "OK"}));
}