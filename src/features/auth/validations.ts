import * as z from "zod";

const NameSchema = z
  .string({ error: "Name is required" })
  .trim()
  .min(3, { error: "Name must be at least 5 characters." })
  .max(40, { error: "Name must be at most 40 characters." });

const EmailSchema = z
  .email({ error: "Invalid email format" })
  .min(3, { error: "Email must be at least 3 characters." })
  .max(100, { error: "Email must be at most 100 characters." })
  // Users can type the email in any case, but we store it in lowercase
  .transform((value) => value.toLowerCase());

const PASSWORD_MAX_LENGTH = 72;

const PasswordSchema = z
  .string({ error: "Password is required" })
  .trim()
  .min(8, {
    error: "Password must be at least 8 characters.",
  })
  // NOTE: bcrypt has a limit of 72 bytes (which should be plenty long)
  .refine(
    (val) => new TextEncoder().encode(val).length <= PASSWORD_MAX_LENGTH,
    {
      error: `Password must be at most ${PASSWORD_MAX_LENGTH} characters.`,
    },
  );

export const SignInSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
});

export const SignUpSchema = z.object({
  name: NameSchema,
  email: EmailSchema,
  password: PasswordSchema,
});
