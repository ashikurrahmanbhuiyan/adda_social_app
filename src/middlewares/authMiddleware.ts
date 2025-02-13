import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) return res.redirect("/login");

    try {
        jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        res.redirect("/login");
    }
};
