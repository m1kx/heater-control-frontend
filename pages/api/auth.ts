import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const data: { password: string } = req.body;
    const password = data.password;
    const cookie = serialize("site-access-token", password, {
        httpOnly: true,
        path: "/",
    });

    if (process.env.SITE_ACCESS_TOKEN !== password) {
        res.status(401).json({
            success: false,
        });
        return;
    }

    res.status(200).setHeader("Set-Cookie", cookie).json({
        success: true,
    });
}
