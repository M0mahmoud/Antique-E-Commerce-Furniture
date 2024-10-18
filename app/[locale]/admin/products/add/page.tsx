"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Upload from "@/components/Upload";
import { FormState } from "@/lib/definitions";
import { addProductAction } from "@/server/products";
import { useActionState, useState } from "react";

export default function AddProduct() {
  const [state, action, isPending] = useActionState<FormState, FormData>(
    addProductAction,
    {
      success: false,
    }
  );
  const [mainImageUrl, setMainImageUrl] = useState<string>("");

  const onSuccess = (result: { url: string }) => {
    setMainImageUrl(result.url);
  };

  const extractErrors = () => {
    if (state?.errors) {
      return Object.values(state.errors).flat();
    }
    return [];
  };
  const errors = extractErrors();

  return (
    <form
      action={async (form) => {
        // TODO: More Control
        form.append("mainProductImage", mainImageUrl);
        action(form);
      }}
      className="space-y-4 p-2"
    >
      <h2 className="text-2xl font-bold text-primary">Add New Product</h2>
      <h3 className="text-lg font-semibold text-secondary-foreground">
        Basic Product Information
      </h3>
      <div>
        <Label>Product Name:</Label>
        <Input
          type="text"
          name="productName"
          required
          className="mt-1 w-full p-2"
        />
      </div>
      <div>
        <Label>SKU:</Label>
        <Input type="text" name="sku" required className="mt-1 w-full p-2" />
      </div>
      <div>
        <Label>Category:</Label>
        <Input
          type="text"
          name="category"
          required
          className="mt-1 w-full p-2"
        />
      </div>
      <div>
        <Label>Brand:</Label>
        <Input type="text" name="brand" className="mt-1 w-full p-2" />
      </div>
      <div>
        <Label>Collection Name:</Label>
        <Input type="text" name="collectionName" className="mt-1 w-full p-2" />
      </div>
      <div>
        <Label>Description:</Label>
        <Textarea
          name="description"
          required
          className="mt-1 w-full p-2"
        ></Textarea>
      </div>
      <h3 className="text-lg font-semibold text-secondary-foreground">
        Product Images
      </h3>
      <div>
        <Label>Main Product Image:</Label>
        <Upload buttonText="Upload Product" onSuccess={onSuccess} />
      </div>
      <div>
        <Label>Other Product Images:</Label>
        <p>Soon...</p>
      </div>

      <h3 className="text-lg font-semibold text-secondary-foreground">
        Pricing & Availability
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <Label>Price:</Label>
          <Input
            type="number"
            name="price"
            required
            className="mt-1 w-full p-2"
          />
        </div>

        <div>
          <Label>Discount Price:</Label>
          <Input
            type="number"
            name="discountPrice"
            className="mt-1 w-full p-2"
          />
        </div>
        <div>
          <Label>Stock Quantity:</Label>
          <Input
            type="number"
            name="stockQuantity"
            required
            className="mt-1 w-full p-2"
          />
        </div>

        <div>
          <Label>Availability Status:</Label>
          <Select name="availabilityStatus">
            <SelectTrigger className="mt-1 w-full p-2">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inStock">In Stock</SelectItem>
              <SelectItem value="outOfStock">Out of Stock</SelectItem>
              <SelectItem value="preOrder">Pre-Order</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <h3 className="text-lg font-semibold text-secondary-foreground">
        Dimensions & Weight
      </h3>
      <div>
        <Label>Dimensions (Height, Width, Depth):</Label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            type="number"
            name="height"
            placeholder="Height"
            required
            className="mt-1 p-2"
          />
          <Input
            type="number"
            name="width"
            placeholder="Width"
            required
            className="mt-1 p-2"
          />
          <Input
            type="number"
            name="depth"
            placeholder="Depth"
            required
            className="mt-1 p-2"
          />
        </div>
      </div>

      <div>
        <Label>Tags:</Label>
        <Input
          type="text"
          name="tags"
          placeholder="Separate by commas"
          className="mt-1 p-2"
        />
      </div>
      <h3 className="text-lg font-semibold text-secondary-foreground">
        Additional Info
      </h3>
      <div>
        <Label>Delivery Time:</Label>
        <Input type="text" name="deliveryTime" className="mt-1 p-2" />
      </div>
      <div>
        {errors.length > 0 && (
          <ul>
            {errors.map((error) => (
              <li className="text-sm text-red-500" key={error}>
                - {error}
              </li>
            ))}
          </ul>
        )}
        {state?.message && (
          <p className="bg-primary font-medium rounded-md text-white p-2 mt-2">
            {state.message}
          </p>
        )}
      </div>
      <div>
        <Button
          type="submit"
          disabled={isPending}
          className="bg-primary text-white p-3 rounded-lg"
        >
          {isPending ? "Adding Product..." : "Add Product"}
        </Button>
      </div>
    </form>
  );
}
