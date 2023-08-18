// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = any[];

const REMOTE_URL =
  "https://pacific-1.albatross.sei-internal.com/connected?seiAddress=";

async function getWalletData (addr: string) {
  // const res = await fetch(`${REMOTE_URL}${addr}`, {
  //   method: "GET",
  //   headers: {
  //     accept:
  //       "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  //     "accept-language": "zh-HK,zh-TW;q=0.9,zh-CN;q=0.8,zh;q=0.7,en;q=0.6",
  //     "cache-control": "max-age=0",
  //     "if-none-match": 'W/"101-UOYOIRlYEwma6HnHBkH47AKHUco"',
  //     "sec-ch-ua":
  //       '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
  //     "sec-ch-ua-mobile": "?0",
  //     "sec-ch-ua-platform": '"macOS"',
  //     "sec-fetch-dest": "document",
  //     "sec-fetch-mode": "navigate",
  //     "sec-fetch-site": "none",
  //     "sec-fetch-user": "?1",
  //     "upgrade-insecure-requests": "1",
  //   },
  //   referrerPolicy: "strict-origin-when-cross-origin",
  //   body: null,
  // });
  const res = await fetch(
    "https://pacific-1.albatross.sei-internal.com/connected?seiAddress=sei1vg54rkwq8tdnf5uf80kxchlvlr6c4lnh2p6d72",
    {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        "accept-language": "zh-HK,zh-TW;q=0.9,zh-CN;q=0.8,zh;q=0.7,en;q=0.6",
        "cache-control": "max-age=0",
        "if-none-match": 'W/"101-UOYOIRlYEwma6HnHBkH47AKHUco"',
        "sec-ch-ua":
          '"Not/A)Brand";v="99", "Google Chrome";v="115", "Chromium";v="115"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
    }
  );
  return res.json();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const addrs = req.body.split('\n').map((addr: string) => addr.trim());
  const results = [];
  for (let i = 0; i < addrs.length; i++) {
    console.log(addrs[i])
    const data = await getWalletData(addrs[i]);
    results.push(data);
  }
  res.status(200).json(results);
}
