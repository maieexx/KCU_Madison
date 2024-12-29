import connectMongo from "../dbConnect";
import test_db from "../Item";

export default async function handler(req, res) {
    await connectMongo();

    if (req.method === "GET") {
        const items = await test_db.find();
        res.status(200).json({ items });
    } else if (req.method === "POST") {
        const newItem = await test_db.create(req.body);
        res.status(201).json(newItem);
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
