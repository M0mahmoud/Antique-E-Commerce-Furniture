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
import { Link } from "@/i18n/routing";
import { Cart, CartProduct } from "@/types/cart";
import { AlertCircle, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { Suspense } from "react";
import { useTranslations } from "next-intl";

const CartComponent: React.FC<{
  product: CartProduct;
  onUpdate: (slug: string, quantity: number) => void;
  onRemove: (slug: string) => void;
}> = ({ product, onUpdate, onRemove }) => {
  const t = useTranslations("cart");

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="mb-4 sm:mb-0 w-24 h-24 sm:h-36 sm:w-36">
            <Link
              href={`/product/${product?.product?.slug}`}
              className="block w-full h-full"
              title={product?.product?.name}
            >
              <Image
                src={product?.product?.main_image?.url || ""}
                alt={product?.product?.name}
                width={96}
                height={96}
                className="rounded-s-md bg-cover w-24 h-24 sm:h-36 sm:w-36"
              />
            </Link>
          </div>
          <div className="w-full sm:w-3/4 sm:pl-4 flex flex-col sm:flex-row items-center justify-between pe-4">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <Link
                href={`/product/${product?.product?.slug}`}
                className="font-semibold text-xl block`"
              >
                {product?.product?.name}
              </Link>
              <p className="text-dark mb-0">
                {t("price")}: ${product?.product?.original_price}
              </p>
              <p className="">
                {t("discount")}: ${product?.product?.original_price}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  onUpdate(product?.product?.slug, product?.quantity - 1)
                }
                disabled={
                  !product?.product?.slug ||
                  product?.quantity <= 1 ||
                  product.quantity === product?.product?.stock_num
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
                disabled={
                  !product?.product?.slug ||
                  product?.quantity >= 99 ||
                  product.quantity === product?.product?.stock_num
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
};

const OrderSummary: React.FC<{ cart: Cart }> = ({ cart }) => {
  const t = useTranslations("cart");

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("orderSummary")}</CardTitle>
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
          <span>{t("subtotal")}</span>
          <span>${cart.total_price?.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>{t("totalQuantity")}</span>
          <span>{cart.total_quantity}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>{t("grandTotal")}</span>
          <span>${cart.total_price?.toFixed(2)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">{t("proceedToCheckout")}</Button>
      </CardFooter>
    </Card>
  );
};

const CartPage: React.FC = () => {
  const t = useTranslations("cart");
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
            {error?.message || t("errorMessage")}
          </p>
        </div>
      </div>
    );
  if (!cart) return <div>{t("emptyCart")}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <Suspense fallback={<Loading />}>
        <div className="grid gap-6 md:grid-cols-3" dir="ltr">
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
                    {t("emptyCart")}
                  </p>
                  <p className="text-gray-600">{t("emptyCartMessage")}</p>
                </div>
              )
            )}
          </div>
          {cart?.data &&
            cart?.data.cart &&
            cart?.data.cart.products.length > 0 && (
              <OrderSummary cart={cart?.data.cart} />
            )}
        </div>
      </Suspense>
    </div>
  );
};

export default CartPage;
