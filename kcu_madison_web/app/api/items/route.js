import connectMongo from "../../../pages/client";
import test_db from "../../../pages/dbQuery";

export async function GET(){
  try {
    await connectMongo();
    const items = await test_db.find();
    return new Response(JSON.stringify({ items }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { password } = await request.json();

    if (password !== process.env.ADMIN_PASSWORD) {
      return new Response(JSON.stringify({ error: "Invalid password" }), { status: 401 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}
