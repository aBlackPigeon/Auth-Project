import jwt from 'jsonwebtoken';

export const generateTokenAndSetCookie = (res,userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    res.cookie("token" , token , {
    httpOnly : true, // prevent xss attack
    secure : process.env.NODE_ENV === "production", // in production https
    sameSite : "strict", // prevent csrf attack
    maxAge : 7 * 24 * 60 * 60 * 1000, // 7 days
});

return token;

}

