import axios from "axios";

export async function createIntention({ test }: { test: string }) {
    console.log("🚀 ~ createIntention ~ formData:", test);
    const res = await axios.post(
        "https://accept.paymob.com/v1/intention/",
        {
            amount: 10,
            currency: "EGP",
            payment_methods: [
                12,
                "card",
                "you can add Integration id directly or your integration name",
            ],
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
            extras: {
                ee: 22,
            },
            redirection_url: "http://localhost:3000/en/paymob",
            notification_url:
                "https://webhook.site/e5088738-1c07-43e5-9ff5-d34a51831f0b",
        },
        {
            headers: {
                Authorization:
                    "Token egy_sk_test_2bad63fcd19370730bb6ce9e3c17cd0b1db7ecda45359b39ee1cc347fee699bb",
            },
        }
    );
    return res.data;
}
