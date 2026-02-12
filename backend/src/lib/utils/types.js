import zod from "zod";

export const userSchema = zod.object({
    fullName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = zod.object({
    email: zod.string().email(),
    password: zod.string(),
});