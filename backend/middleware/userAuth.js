import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.id) {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Authentication failed" });
    }
};

export default isAuthenticated;