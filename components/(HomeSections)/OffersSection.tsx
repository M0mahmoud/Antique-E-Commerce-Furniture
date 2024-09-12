"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import offer from "@/images/offer_img.webp";
import { getStartOfNextWeek } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
const OffersSection = () => {
  const t = useTranslations("offer");
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const minDate = getStartOfNextWeek();

  // Timer logic
  useEffect(() => {
    let countdown: any;

    async function getOffer() {
      try {
        const res = await fetch("/api/public/offers", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const result = await res.json();
        return result.offer[result.offer.length - 1];
      } catch (error) {
        console.error("Error fetching offer:", error);
        return null;
      }
    }

    async function startCountdown() {
      const target = await getOffer();
      if (!target) return;

      const targetDate = new Date(target.date).getTime();

      countdown = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft < 0) {
          clearInterval(countdown);
          setTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          return;
        }

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setTimer({ days, hours, minutes, seconds });
      }, 1000);
    }

    startCountdown();

    return () => clearInterval(countdown);
  }, []);

  return (
    <section className="" id="our_offer">
      <div className="container mx-aut">
        <div className="flex items-center justify-between gap-5 flex-col md:flex-row">
          <div className="w-full">
            <div className="flex justify-center mb-8">
              <Image
                src={offer}
                alt="Our Offer"
                width={444}
                height={470}
                className="w-3/5 h-3/5 bg-cover animate-spinYYYYYY"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="offer_text">
              <h2 className="mb-4 text-5xl font-extrabold">
                {t("weeklySale")}
              </h2>
              <div className="my-9 md:me-14">
                <div
                  id="timer"
                  className="flex justify-around items-center gap-2"
                >
                  <div
                    id="days"
                    className="text-2xl md:text-4xl text-dark font-black border-e-[1px] border-e-dark  pe-[9%] lg:pe-[4%] "
                  >
                    <span className="block text-sm uppercase">{t("days")}</span>
                    {timer.days}
                  </div>
                  <div
                    id="hours"
                    className="text-2xl md:text-4xl text-dark font-black border-e-[1px] border-e-dark  pe-[9%] lg:pe-[4%] "
                  >
                    <span className="block text-sm uppercase">
                      {t("hours")}
                    </span>
                    {timer.hours}
                  </div>
                  <div
                    id="minutes"
                    className="text-2xl md:text-4xl text-dark font-black border-e-[1px] border-e-dark  pe-[9%] lg:pe-[4%] "
                  >
                    <span className="block text-sm uppercase">
                      {t("minutes")}
                    </span>
                    {timer.minutes}
                  </div>
                  <div
                    id="seconds"
                    className="text-2xl md:text-4xl text-dark font-black   pe-[9%] lg:pe-[4%] "
                  >
                    <span className="block text-sm uppercase">
                      {t("seconds")}
                    </span>
                    {timer.seconds}
                  </div>
                </div>
              </div>
              <form className="flex">
                <Input
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  aria-label="enter email"
                  aria-describedby="basic"
                  className="px-2 md:px-3 py-6 border-dark bg-transparent text-lg md:text-xl placeholder:capitalize w-full focus:outline-none rounded-e-none"
                />
                <Button
                  variant="outline"
                  className="px-2 md:px-4 py-6 text-lg md:text-xl uppercase rounded-s-none border-dark border-s-0"
                >
                  {t("bookNow")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* TODO: Will Move to Dashboard */}
      {/* TODO: Refactore Code */}
      <div className="container mx-aut">
        <form
          id="offerForm"
          className="my-6 border border-primary rounded-md p-2"
          onSubmit={async (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            // Get form data
            const formData = new FormData(e.currentTarget);

            try {
              const response = await fetch("/api/public/offers", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  discount: formData.get("discount"),
                  date: formData.get("date"),
                }),
              });

              const data = await response.json();
              console.log("data:", data);
              if (response.ok) {
                console.log("Offer created successfully");
              }
            } catch (error) {
              console.error("Network error:", error);
            }
          }}
        >
          <p className="text-lg text-destructive">Dev Mode</p>
          <div className="flex gap-2 justify-between items-center">
            <div className="mb-4 w-full">
              <Label htmlFor="discount">Discount</Label>
              <Input
                type="number"
                id="discount"
                step={10}
                min={10}
                max={100}
                name="discount"
                placeholder="Enter Discount Percentage"
                required
              />
            </div>

            <div className="mb-4 w-full">
              <Label htmlFor="date">Expiry Date</Label>
              <Input type="date" id="date" name="date" min={minDate} required />
            </div>
          </div>

          <Button type="submit" className="bg-primary text-white py-2 px-4">
            Create Offer
          </Button>
        </form>
      </div>
    </section>
  );
};

export default OffersSection;
