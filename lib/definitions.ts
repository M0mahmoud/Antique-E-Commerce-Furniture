import { array, number, object, string, z } from "zod";

export const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : "https://localhost:3000";

export type AuthFormState =
  | {
      errors?: {
        url?: string[];
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      success?: boolean;
    }
  | undefined;

export const SignUpFormState = object({
  name: string()
    .min(5, { message: "Name must be at least 5 characters long." })
    .trim(),
  email: string().email({ message: "Enter a valid email." }).trim(),
  password: string()
    .min(8, { message: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { message: "Contain at least one letter." })
    .regex(/[0-9]/, { message: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contain at least one special character.",
    })
    .trim(),
});

export const LoginFormSchema = object({
  email: string().email({ message: "Please enter a valid email." }),
  password: string().min(1, { message: "Password field must not be empty." }),
});

export const OfferSchema = object({
  discount: string({ message: "Discount field must not be empty." }),
  date: string({ message: "Date field must not be empty." }),
});

export const ProductSchema = object({
  productName: string().min(1, "Product name is required"),
  sku: string().min(1, "SKU is required"),
  category: string().min(1, "Category is required"),
  brand: string().optional(),
  collectionName: string().optional(),
  description: string().min(1, "Description is required"),
  price: number().positive("Price must be positive"),
  discountPrice: number()
    .positive("Discount price must be positive")
    .optional(),
  stockQuantity: number()
    .int("Stock quantity must be an integer")
    .nonnegative("Stock quantity must be non-negative"),
  availabilityStatus: z.enum(["inStock", "outOfStock", "preOrder"]),
  dimensions: z
    .object({
      height: number().positive("Height must be positive"),
      width: number().positive("Width must be positive"),
      depth: number().positive("Depth must be positive"),
    })
    .optional(),

  mainProductImage: string().url("Invalid image URL"),
  productImages: array(string().url("Invalid image URL")).optional(),

  tags: array(string()).optional(),
  deliveryTime: string().optional(),
});

export type FormState = {
  success: boolean;
  errors?: Record<string, string[]>;
  message?: string;
};
