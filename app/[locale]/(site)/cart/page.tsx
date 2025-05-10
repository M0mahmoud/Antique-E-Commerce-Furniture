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
import {
  useAddToCart,
  useRemoveFromCart,
  useUserCart,
} from "@/hooks/user/cart";
import { Cart, CartProduct } from "@/types/cart";
import { AlertCircle, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";

const CartComponent: React.FC<{
  product: CartProduct;
  onUpdate: (slug: string, quantity: number) => void;
  onRemove: (slug: string) => void;
}> = ({ product, onUpdate, onRemove }) => (
  <Card className="overflow-hidden">
    <CardContent className="p-4">
      <div className="flex flex-col sm:flex-row items-center">
        <div className="w-full sm:w-1/4 mb-4 sm:mb-0">
          <Image
            src={product?.product?.main_image?.url || ""}
            alt={product?.product?.name}
            width={96}
            height={96}
            className="rounded-md bg-cover w-24 h-24 sm:h-36 sm:w-36 mx-auto"
          />
        </div>
        <div className="w-full sm:w-3/4 sm:pl-4 flex flex-col sm:flex-row items-center justify-between">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h3
              // TODO: Fix segments
              // href={`${baseUrl}/{LANGUAGE}/product/${product?.product?._id}`}
              className="font-semibold text-xl"
            >
              {product?.product?.name}
            </h3>
            <p className="text-dark mb-0">
              Price: ${product?.product?.original_price}
            </p>
            <p className="">Discount: ${product?.product?.original_price}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                onUpdate(product?.product?.slug, product?.quantity - 1)
              }
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Input
              type="text"
              value={product?.quantity}
              min={1}
              disabled
              className="w-12 text-center"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                onUpdate(product?.product?.slug, product?.quantity + 1)
              }
            >
              <Plus className="h-4 w-4" />
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={() => onRemove(product?._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const OrderSummary: React.FC<{ cart: Cart }> = ({ cart }) => (
  <Card>
    <CardHeader>
      <CardTitle>Order Summary</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2 border-b pb-4 mb-4">
        {cart?.products?.map((item) => (
          <div key={item._id} className="flex justify-between text-sm">
            <span>
              {item.product?.name} (X{item.quantity})
            </span>
            <span>
              ${(item.product?.original_price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between mb-2">
        <span>Subtotal</span>
        <span>${cart.total_price?.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mb-2">
        <span>Total Quantity</span>
        <span>{cart.total_quantity}</span>
      </div>
      <div className="flex justify-between font-bold">
        <span>Grand Total</span>
        <span>${cart.total_price?.toFixed(2)}</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full">Proceed to Checkout</Button>
    </CardFooter>
  </Card>
);

const CartPage: React.FC = () => {
  const { data: cart, error, isPending } = useUserCart();
  console.log(cart);

  const addToCart = useAddToCart();
  const removeFromCart = useRemoveFromCart();

  if (isPending) return <Loading />;

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
            {!isPending &&
            cart?.data &&
            cart.data.cart?.products?.length > 0 ? (
              <>
                {cart.data.cart?.products?.map((product) => (
                  <CartComponent
                    key={product?._id}
                    product={product}
                    onUpdate={(slug, quantity) =>
                      addToCart.mutate({ quantity, slug })
                    }
                    onRemove={(slug) => removeFromCart.mutate(slug)}
                  />
                ))}
              </>
            ) : (
              !isPending && (
                <div className="text-center">
                  <p className="text-lg font-semibold text-gray-800">
                    Your cart is empty.
                  </p>
                  <p className="text-gray-600">
                    Browse our products and add some to your cart!
                  </p>
                </div>
              )
            )}
          </div>
          {cart?.data && cart?.data.cart && (
            <OrderSummary cart={cart?.data.cart} />
          )}
        </div>
      </Suspense>
    </div>
  );
};

export default CartPage;
