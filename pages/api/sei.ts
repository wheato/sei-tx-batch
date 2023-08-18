// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = any[];

const REMOTE_URL =
  "https://pacific-1.albatross.sei-internal.com/connected?seiAddress=";

async function getWalletData (addr: string) {
  const res = await axios.get(`${REMOTE_URL}${addr}`, {
    headers: {
      "Content-Type": "application/json",
      "accept-language": "zh-HK,zh-TW;q=0.9,zh-CN;q=0.8,zh;q=0.7,en;q=0.6",
      "if-none-match": 'W/"43c-tPzePboJlavsMlxtUPanrVQK8+o"',
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
  });
  return res.data;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const addrs = req.body.split('\n').map((addr: string) => addr.trim());
  const results = [];
  for (let i = 0; i < addrs.length; i++) {
    try {
      const data = await getWalletData(addrs[i]);
      if (data.status !== 'success') {
        results.push({ address: addrs[i], status: -1, usdValue: 0});
        continue;
      }
      // 处理数据
      if (!data.data.tx) {
        results.push({ address: addrs[i], status: 0, usdValue: 0 });
        continue;
      }
      const tx = data.data.tx;
      const { usdValue, timestamp } = tx;
      results.push({ address: addrs[i], status: 1, usdValue, timestamp });
    } catch (err) {
      console.log(err);
      // update
      results.push({ address: addrs[i], status: -1, usdValue: 0 });
    }
  }
  res.status(200).json(results);
}
