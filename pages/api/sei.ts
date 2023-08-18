// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = any[];

const REMOTE_URL =
  "https://pacific-1.albatross.sei-internal.com/connected?seiAddress=";

async function getWalletData (addr: string) {
  const res = await axios.get(`${REMOTE_URL}${addr}`);
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
      results.push({ address: addrs[i], status: -1, usdValue: 0 });
    }
  }
  res.status(200).json(results);
}
