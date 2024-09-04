async function IntentionV1() {
  let raw = JSON.stringify({
    amount: 10,
    currency: "EGP",
    expiration: 5800,
    payment_methods: [12, "card", "4630444"],
    items: [
      {
        name: "Item name 1",
        amount: 10,
        description: "Watch",
        quantity: 1,
      },
    ],
    billing_data: {
      apartment: "6",
      first_name: "Ammar",
      last_name: "Sadek",
      street: "938, Al-Jadeed Bldg",
      building: "939",
      phone_number: "+96824480228",
      country: "OMN",
      email: "AmmarSadek@gmail.com",
      floor: "1",
      state: "Alkhuwair",
    },
    customer: {
      first_name: "Ammar",
      last_name: "Sadek",
      email: "AmmarSadek@gmail.com",
      extras: {
        re: "22",
      },
    },
    integrations: [4630471, 4630466, 4630444],
  });

  const res = await fetch("https://accept.paymob.com/v1/intention/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.SECERT_KEY}`,
    },
    body: raw,
    redirect: "follow",
  });
  const result = await res.json();
  return result;
}

export async function POST(_request: Request) {
  const data = IntentionV1();
  let raw = JSON.stringify({
    amount: 10,
    currency: "EGP",
    expiration: 5800,
    payment_methods: [12, "card", "4630444"],
    items: [
      {
        name: "Item name 1",
        amount: 10,
        description: "Watch",
        quantity: 1,
      },
    ],
    billing_data: {
      apartment: "6",
      first_name: "Ammar",
      last_name: "Sadek",
      street: "938, Al-Jadeed Bldg",
      building: "939",
      phone_number: "+96824480228",
      country: "OMN",
      email: "AmmarSadek@gmail.com",
      floor: "1",
      state: "Alkhuwair",
    },
    customer: {
      first_name: "Ammar",
      last_name: "Sadek",
      email: "AmmarSadek@gmail.com",
      extras: {
        re: "22",
      },
    },
    integrations: [4630471, 4630466, 4630444],
  });

  const res = await fetch("https://accept.paymob.com/v1/intention/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.SECERT_KEY}`,
    },
    body: raw,
    redirect: "follow",
  });
  const result = await res.json();
  return Response.json({ result });
}
export async function GET(_request: Request) {
  return Response.json({ msg: "intention" });
}
