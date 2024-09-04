export async function GET(_request: Request) {
  return Response.json({ error: "Testing MODE" });
}

async function getToken() {
  const res = await fetch("https://accept.paymob.com/api/auth/tokens", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key: process.env.API_KEY,
    }),
    method: "POST",
    redirect: "follow",
  });
  const data = await res.json();
  return data.token;
}
async function createOrder(token: string) {
  const res = await fetch("https://accept.paymob.com/api/ecommerce/orders", {
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth_token: token,
      delivery_needed: "false",
      amount_cents: "100",
      currency: "EGP",
      items: [
        {
          name: "ASC1515",
          amount_cents: "500000",
          description: "Smart Watch",
          quantity: "1",
        },
      ],
    }),
    method: "POST",
    redirect: "follow",
  });
  const data = await res.json();
  return data.id;
}

export async function POST(_request: Request) {
  const token = await getToken();
  const orderId = await createOrder(token);

  const billingData = {
    apartment: "803",
    email: "claudette09@exa.com",
    floor: "42",
    first_name: "Clifford",
    street: "Ethan Land",
    building: "8028",
    phone_number: "+86(8)9135210487",
    shipping_method: "PKG",
    postal_code: "01898",
    city: "Jaskolskiburgh",
    country: "CR",
    last_name: "Nicolas",
    state: "Utah",
  };

  try {
    const res = await fetch(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          auth_token: token,
          amount_cents: "100",
          expiration: 3600,
          order_id: Number(orderId),
          billing_data: billingData,
          currency: "EGP",
          integration_id: ["4630444", "4630471"],
        }),
        redirect: "follow",
      }
    );
    const result = await res.json();
    console.log("result:", result);

    return Response.json({
      url: `https://accept.paymob.com/api/acceptance/iframes/862065?payment_token=${result.token}`,
    });
  } catch (error) {
    console.log("error:", error);
    return Response.json({ error });
  }
}
