import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";

const API_URL = process.env.API_URL;

const proxy = httpProxy.createProxyServer();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method != "POST") {
    res.status(404).json("method isn/t accepted");
  }
  return new Promise((resolve, reject) => {
    req.headers.cookie = "";

    const interceptLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let apiResponseBody = "";
      proxyRes.on("data", (chunk) => {
        apiResponseBody += chunk;
      });

      proxyRes.on("end", () => {
        try {
          const {access_token} = JSON.parse(apiResponseBody);
          const cookies = new Cookies(req, res);
          cookies.set("access_token", access_token, {
            httpOnly: true,
            sameSite: "lax",
          });
          (res as NextApiResponse)
            .status(200)
            .json({ message: "login successful" });
        } catch (err) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: "something was wrong" });
        }
        resolve(true);
      });
    };

    proxy.once("proxyRes", interceptLoginResponse);

    proxy.once("error", reject);

    proxy.web(req, res, {
      target: API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
