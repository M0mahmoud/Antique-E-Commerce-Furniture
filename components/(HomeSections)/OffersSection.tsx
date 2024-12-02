"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import offer from "@/images/sofa.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export default function OffersSection() {
    const t = useTranslations("offer");
    const [email, setEmail] = useState("");
    const [timeLeft, setTimeLeft] = useState<TimeLeft>({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        // WAIT BACKEND
        // Set end date to 7 days from now
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 7);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = endDate.getTime() - now;

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor(
                    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                ),
                minutes: Math.floor(
                    (distance % (1000 * 60 * 60)) / (1000 * 60)
                ),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        // Here you would typically handle the email subscription
        console.log("Email submitted:", email);
        toast.success("Thank you for subscribing to our sale updates!");
        setEmail("");
    };

    return (
        <section className="bg-gray-50" id="offers">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="relative aspect-square max-w-md mx-auto">
                        <Image
                            src={offer}
                            alt="Luxury Tufted Ottoman"
                            width={570}
                            height={490}
                            className="object-cover rounded-lg"
                        />
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold">
                            -60%
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                                {t("weeklySale")}
                            </h2>
                            <p className="text-xl text-gray-600">
                                Don&lsquo;t miss out on our biggest sale of the
                                season. Limited time offer!
                            </p>
                        </div>

                        <div className="flex gap-2 sm:gap-4">
                            <TimeBox value={timeLeft.days} label={t("days")} />
                            <TimeBox
                                value={timeLeft.hours}
                                label={t("hours")}
                            />
                            <TimeBox
                                value={timeLeft.minutes}
                                label={t("minutes")}
                            />
                            <TimeBox
                                value={timeLeft.seconds}
                                label={t("seconds")}
                            />
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-2">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Input
                                    type="email"
                                    placeholder={t("emailPlaceholder")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="flex-1"
                                    required
                                />
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="bg-primary text-white"
                                >
                                    {t("bookNow")}
                                </Button>
                            </div>
                            <p className="text-sm text-gray-500">
                                *Subscribe to get updates about our exclusive
                                offers and discounts
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
const TimeBox = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center bg-white rounded-lg p-3 shadow-sm w-full">
        <span className="text-3xl font-bold text-gray-900">{value}</span>
        <span className="text-sm text-gray-600 uppercase">{label}</span>
    </div>
);
