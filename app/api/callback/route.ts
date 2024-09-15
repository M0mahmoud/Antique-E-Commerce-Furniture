import crypto from "crypto";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  // const body = await req.json();

  // const sortedKeys = Object.keys(body).sort();
  // const hmac = body["hmac"];

  // const array = [
  //   "amount_cents",
  //   "created_at",
  //   "currency",
  //   "error_occured",
  //   "has_parent_transaction",
  //   "id",
  //   "integration_id",
  //   "is_3d_secure",
  //   "is_auth",
  //   "is_capture",
  //   "is_refunded",
  //   "is_standalone_payment",
  //   "is_voided",
  //   "order.id",
  //   "owner",
  //   "pending",
  //   "source_data.pan",
  //   "source_data.sub_type",
  //   "source_data.type",
  //   "success",
  // ];
  // let connectedString = "";
  // sortedKeys.forEach((key) => {
  //   if (array.includes(key)) {
  //     connectedString += body[key];
  //   }
  // });

  // const secret = process.env.PAYMOB_HMAC;
  // const hashed = crypto
  //   .createHmac("sha512", secret || "")
  //   .update(connectedString)
  //   .digest("hex");

  // if (hashed === hmac) {
  //   return "Done";
  // } else {
  //   return "Failed";
  // }
  return NextResponse.json({ msg: "Will Fix it" });
}
