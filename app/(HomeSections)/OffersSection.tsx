"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import offer from "@/images/offer_img.webp";
import Image from "next/image";
import { useEffect, useState } from "react";
const OffersSection = () => {
  const [timer, setTimer] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  // Timer logic
  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const targetDate = new Date("2024-10-01T23:59:59").getTime();
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
                Weekly Sale on 60% Off All Products
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
                    <span className="block text-sm uppercase">Days</span>
                    {timer.days}
                  </div>
                  <div
                    id="hours"
                    className="text-2xl md:text-4xl text-dark font-black border-e-[1px] border-e-dark  pe-[9%] lg:pe-[4%] "
                  >
                    <span className="block text-sm uppercase">Hours</span>
                    {timer.hours}
                  </div>
                  <div
                    id="minutes"
                    className="text-2xl md:text-4xl text-dark font-black border-e-[1px] border-e-dark  pe-[9%] lg:pe-[4%] "
                  >
                    <span className="block text-sm uppercase">Minutes</span>
                    {timer.minutes}
                  </div>
                  <div
                    id="seconds"
                    className="text-2xl md:text-4xl text-dark font-black   pe-[9%] lg:pe-[4%] "
                  >
                    <span className="block text-sm uppercase">Seconds</span>
                    {timer.seconds}
                  </div>
                </div>
              </div>
              <form className="flex">
                <Input
                  type="email"
                  placeholder="enter email"
                  aria-label="enter email"
                  aria-describedby="basic"
                  className="px-2 md:px-3 py-6 border-dark bg-transparent text-lg md:text-xl placeholder:capitalize w-full focus:outline-none rounded-e-none"
                />
                <Button
                  variant="outline"
                  className="px-2 md:px-4 py-6 text-lg md:text-xl uppercase rounded-s-none border-dark border-s-0"
                >
                  book now
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OffersSection;
