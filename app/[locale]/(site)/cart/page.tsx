"use client";

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
import { AlertCircle, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
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

const fetchCart = async (): Promise<CartDocument> => {
  const response = await fetch(`/api/cart`);
  if (!response.ok) throw new Error("Failed to fetch cart");
  return response.json();
};

const updateCartItem = async ({
  itemId,
  quantity,
}: {
  itemId: string;
  quantity: number;
}) => {
  const response = await fetch(`/api/cart`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId, quantity }),
  });
  if (!response.ok) throw new Error("Failed to update item");
  return response.json();
};

const removeCartItem = async (itemId: string) => {
  const response = await fetch(`/api/cart`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ itemId }),
  });
  if (!response.ok) throw new Error("Failed to remove item");
  return response.json();
};

const CartItemComponent: React.FC<{
  item: CartItem;
  onUpdate: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}> = ({ item, onUpdate, onRemove }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-4">
      <div className="flex flex-col sm:flex-row items-center">
        <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
          <Image
            src={item.product.mainProductImage}
            alt={item.product.productName}
            width={96}
            height={96}
            className="rounded-md bg-cover w-24 h-24 sm:h-36 sm:w-36 mx-auto"
          />
        </div>
        <div className="w-full sm:w-3/4 sm:pl-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h3
              // TODO: Fix segments
              // href={`${baseUrl}/{LANGUAGE}/product/${item.product._id}`}
              className="font-semibold text-xl"
            >
              {item.product.productName}
            </h3>
            <p className="text-dark mb-0">Price: ${item.priceAtAddition}</p>
            <p className="">Discount: ${item.discountPriceAtAddition}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onUpdate(item._id, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="text"
              value={item.quantity}
              min={1}
              disabled
              className="w-12 text-center"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => onUpdate(item._id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onRemove(item._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const OrderSummary: React.FC<{ cart: CartDocument }> = ({ cart }) => (
  <Card>
    <CardHeader>
      <CardTitle>Order Summary</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2 border-b pb-4 mb-4">
        {cart.items.map((item) => (
          <div key={item._id} className="flex justify-between text-sm">
            <span>
              {item.product.productName} (X{item.quantity})
            </span>
            <span>${(item.priceAtAddition * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${cart.subTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Discount</span>
        <span>-${cart.discountTotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Grand Total</span>
        <span>${cart.grandTotal.toFixed(2)}</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Proceed to Checkout</Button>
    </CardFooter>
  </Card>
);

const CartPage: React.FC = () => {
  const queryClient = useQueryClient();
  const {
    data: cart,
    error,
    isLoading,
  } = useQuery<CartDocument>({ queryKey: ["cart"], queryFn: fetchCart });

  const updateQuantity = useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      toast.success("Product Updated");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("Error updating item"),
  });

  const removeItem = useMutation({
    mutationFn: removeCartItem,
    onSuccess: () => {
      toast.success("Product removed from cart");
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => toast.error("Error removing item"),
  });

  if (isLoading) return <Loading />;
  if (error)
    return (
      <div className="w-full h-dvh grid place-content-center">
        <div className="text-center">
          <AlertCircle className="text-red-500 w-10 h-10 mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-800">
            {error?.message || "An error occurred. Please try again."}
          </p>
        </div>
      </div>
    );
  if (!cart) return <div>Cart is empty</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
      <Suspense fallback={<Loading />}>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <CartItemComponent
                key={item._id}
                item={item}
                onUpdate={(id, quantity) =>
                  updateQuantity.mutate({ itemId: id, quantity })
                }
                onRemove={(id) => removeItem.mutate(id)}
              />
            ))}
          </div>
          <OrderSummary cart={cart} />
        </div>
      </Suspense>
    </div>
  );
};

export default CartPage;
