import zod from "zod";

export const userSchema = zod.object({
    fullName: zod.string(),
    email: zod.string().email(),
    password: zod.string().min(6),
});