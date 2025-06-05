"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Package, Truck } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import React, { useState } from "react";

interface Order {
  id: string;
  date: Date;
  total: number;
  status: "processing" | "shipped" | "delivered";
  items: number;
}

const initialOrders: Order[] = [
  {
    id: "1001",
    date: new Date("2023-05-15"),
    total: 129.99,
    status: "delivered",
    items: 2,
  },
  {
    id: "1002",
    date: new Date("2023-06-02"),
    total: 79.99,
    status: "shipped",
    items: 1,
  },
  {
    id: "1003",
    date: new Date("2023-06-10"),
    total: 249.99,
    status: "processing",
    items: 3,
  },
  {
    id: "1004",
    date: new Date("2023-06-18"),
    total: 99.99,
    status: "delivered",
    items: 1,
  },
  {
    id: "1005",
    date: new Date("2023-06-25"),
    total: 189.99,
    status: "shipped",
    items: 2,
  },
];

const OrdersPage = () => {
  const t = useTranslations("ordersPage");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredOrders = initialOrders.filter(
    (order) =>
      order.id.includes(searchTerm) &&
      (statusFilter === "all" || order.status === statusFilter)
  );

  return (
    <div className="w-full p-2">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">{t("title")}</h2>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <Input
          placeholder={t("searchPlaceholder")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder={t("filterByStatus")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("allStatuses")}</SelectItem>
            <SelectItem value="processing">{t("processing")}</SelectItem>
            <SelectItem value="shipped">{t("shipped")}</SelectItem>
            <SelectItem value="delivered">{t("delivered")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">
          {t("noOrdersFound")}
        </p>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;

function formatDate(date: Date, locale: string): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

function OrderItem({ order }: { order: Order }) {
  const t = useTranslations("ordersPage");
  const locale = useLocale();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start">
          <div className="flex items-start mb-4 md:mb-0 gap-3">
            <div className="bg-primary/10 p-3 rounded-md mr-4">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-0">
                {t("orderNumber")}
                {order.id}
              </h3>
              <p className="text-sm text-muted-foreground">
                {formatDate(order.date, locale)}
              </p>
            </div>
          </div>
          <div
            className={`p-2 rounded-md text-xs font-semibold ${getStatusColor(
              order.status
            )}`}
          >
            {t(order.status)}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start mt-2 pt-2 border-t">
          <div className="flex items-center mb-4 sm:mb-0 gap-2">
            <p className="font-medium text-lg mr-4">
              ${order.total.toFixed(2)}
            </p>
            <p className="text-sm text-muted-foreground">
              {order.items} {order.items > 1 ? t("items") : t("item")}
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 me-2" />
              {t("viewDetails")}
            </Button>
            {order.status !== "delivered" && (
              <Button variant="outline" size="sm">
                <Truck className="h-4 w-4 me-2" />
                {t("trackOrder")}
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
