import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const redirectIfAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (token) {
        try {
            jwt.verify(token, JWT_SECRET);
            return res.redirect("/dashboard"); // Redirect to dashboard if already logged in
        } catch (error) {
            next(); // Proceed to login if token is invalid
        }
    } else {
        next(); // Proceed to login if no token found
    }
};
