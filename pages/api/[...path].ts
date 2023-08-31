import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy from "http-proxy";
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
  res.status(200).json({ message: 'Hello from Next.js!' })
    // console.log('----1----1-----')
    // return new Promise((resolve) => {
    
    // // const cookies = new Cookies(req, res);
    // // const authToken = cookies.get("access_token");
    // // console.log('----1----1-----', authToken)

    // // if (authToken) {
    // //   req.headers.Authorization = `Bearer ${authToken}`;
    // // }

    // req.headers.cookie = "";

    // proxy.web(req, res, {
    //   target: API_URL,
    //   changeOrigin: true,
    //   selfHandleResponse: false,
    // });

    // proxy.once("proxyRes", () => {
    //   resolve(true);
    // });
  // });
}
