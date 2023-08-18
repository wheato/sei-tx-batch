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
    },
  });
  return res.data;
}

async function sleep (ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function splitArrayIntoGroupsOfTen<T>(arr: T[]): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += 10) {
    result.push(arr.slice(i, i + 10));
  }
  return result;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const addrs = req.body.split('\n').map((addr: string) => addr.trim());
  const splitedAddrs = splitArrayIntoGroupsOfTen<string>(addrs);
  const results = [];
  for (let i = 0; i < splitedAddrs.length; i++) {
    try {
      const batch = await Promise.all(splitedAddrs[i].map((addr) => getWalletData(addr)));
      batch.forEach((data, index) => {
        if (data.status !== "success") {
          results.push({ address: splitedAddrs[i][index], status: -1, usdValue: 0 });
          return;
        }
        // 处理数据
        if (!data.data.tx) {
          results.push({
            address: data.data?.wallet?.seiAddress ?? splitedAddrs[i][index],
            status: 0,
            usdValue: 0,
          });
          return;
        }
        const tx = data.data.tx;
        const { usdValue, timestamp } = tx;
        results.push({ address: tx.address, status: 1, usdValue, timestamp });
      });
    } catch (err: any) {
      console.log(err);
      // update
      results.push({
        address: err.string().slice(0, 10) + "...",
        status: -1,
        usdValue: 0,
      });
    }
  }
  res.status(200).json(results);
}
