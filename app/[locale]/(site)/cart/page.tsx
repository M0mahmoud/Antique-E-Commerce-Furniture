"use client";
import product_11 from "@/images/products/product_11.png";

import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { baseUrl, ProductDocument } from "@/lib/definitions";
import { Link } from "@/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Minus, Plus, Trash2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";

// TODO: Fix Type Errors
type CartItem = {
  _id: string;
  product: ProductDocument;
  quantity: number;
  priceAtAddition: number;
  discountPriceAtAddition?: number;
  totalPrice: number;
};

type CartDocument = {
  userId: string;
  items: CartItem[];
  subTotal: number;
  discountTotal: number;
  grandTotal: number;
  createdAt?: Date;
  updatedAt?: Date;
};

const CartPage = () => {
  const [cart, setCart] = useState<CartDocument | null>(null);
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch(`/api/cart`);
      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();
      return data;
    },
  });

  useEffect(() => {
    if (!isLoading && data) {
      setCart(data);
    }
  }, [data, isLoading]);

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const response = await fetch(`/api/cart/item/${itemId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });
      if (!response.ok) throw new Error("Failed to update quantity");
      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // TODO: Refactor
  const removeItem = useMutation({
    mutationFn: async (itemId: string) => {
      // TODO: For Testing || Recalculate
      const updatedItems = cart?.items.filter((item) => item._id !== itemId);
      const subTotal =
        updatedItems?.reduce(
          (acc, item) => acc + item.priceAtAddition * item.quantity,
          0
        ) || 0;
      const discountTotal =
        updatedItems?.reduce(
          (acc, item) =>
            acc + (item.discountPriceAtAddition || 0) * item.quantity,
          0
        ) || 0;
      const grandTotal = subTotal - discountTotal;
      if (cart) {
        setCart({
          ...cart,
          items: updatedItems || [],
          subTotal,
          discountTotal,
          grandTotal,
        });
      }

      const response = await fetch(`/api/cart`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          itemId,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to remove item");
      }
      const updatedCart = await response.json();
      return updatedCart;
    },
    onSuccess: () => {
      toast.success("Product removed from cart");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError: (error) => {
      console.error(":error", error);
      toast.error("Error removing item");
    },
  });

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
        <div className="grid gap-6 md:grid-cols-3">
          <Suspense fallback={<Loading />}>
            <div className="md:col-span-2 space-y-4">
              {cart?.items?.map((item) => (
                <Card key={item?._id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row items-center">
                      <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
                        <Image
                          src={item?.product?.mainProductImage}
                          alt={item?.product?.productName}
                          width={96}
                          height={96}
                          className="rounded-md bg-cover w-24 h-24 sm:h-36 sm:w-36 mx-auto"
                        />
                      </div>
                      <div className="w-full sm:w-3/4 sm:pl-4 flex flex-col sm:flex-row items-center justify-between">
                        <div className="text-center sm:text-left mb-4 sm:mb-0">
                          <h3 className="font-semibold text-xl">
                            {item?.product?.productName}
                          </h3>
                          <p className="text-dark mb-0">
                            Price: ${item?.priceAtAddition}
                          </p>
                          <p className="">
                            Discount: ${item?.discountPriceAtAddition}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              updateQuantity(item?._id!, item?.quantity - 1)
                            }
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            value={item?.quantity}
                            onChange={(e) =>
                              updateQuantity(
                                item?._id!,
                                parseInt(e.target.value)
                              )
                            }
                            className="w-16 text-center"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() =>
                              updateQuantity(item?._id!, item?.quantity + 1)
                            }
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              removeItem.mutate(item?._id!);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Suspense>
          <Suspense fallback={<Loading />}>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 border-b pb-4 mb-4">
                    {cart?.items.map((item) => (
                      <div
                        key={item?._id}
                        className="flex justify-between text-sm"
                      >
                        <span>
                          {item?.product?.productName} (X{item?.quantity})
                        </span>
                        <span>
                          ${(item?.priceAtAddition * item?.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${cart?.subTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Discount</span>
                    <span>-${cart?.discountTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Grand Total</span>
                    <span>${cart?.grandTotal.toFixed(2)}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Proceed to Checkout</Button>
                </CardFooter>
              </Card>
            </div>
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default CartPage;
