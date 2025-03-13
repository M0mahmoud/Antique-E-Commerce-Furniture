import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();

    // Verify the webhook signature (if Paymob provides one)
    // This step is crucial for security to ensure the webhook is from Paymob
    // You'll need to implement this based on Paymob's documentation

    // Process the webhook payload
    console.log("Received Paymob webhook:", body);

    // Here you would typically:
    // 1. Verify the payment status
    // 2. Update your database
    // 3. Trigger any necessary actions (e.g., fulfill an order)

    if (body.success === true) {
        // Payment was successful
        // Update your database, mark the order as paid, etc.
        console.log("Payment successful for order:", body.order_id);
    } else {
        // Payment failed or was declined
        console.log("Payment failed for order:", body.order_id);
    }

    // Always return a 200 status to acknowledge receipt of the webhook
    return NextResponse.json({ received: true }, { status: 200 });
}
