import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [inputs, setInputs] = useState('');

  const onQuery = async () => {
    try {
      const res = await fetch('/api/sei', {
        method: 'POST',
        body: inputs,
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      alert('网络错误！')
    }
  }

  return (
    <main className={`flex min-h-screen flex-col px-24 py-12 ${inter.className}`}>
      <h2 className="mb-4 text-3xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
        Sei 跨链到账批量查询
      </h2>
      <div className="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-800 text-left">
        填写要查询的 Sei 地址
      </div>
      <textarea
        id="message"
        rows={15}
        className="block p-2.5 mb-4 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="填写 Sei 地址，一行一个地址"
        onChange={(e) => setInputs(e.target.value)}
      ></textarea>
      <div className="mb-8">
        <button
          onClick={onQuery}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
        >
          查询
        </button>
      </div>
      <h3 className="mb-4 text-center text-2xl font-extrabold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
        查询结果
      </h3>
      <div className="w-full relative overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                地址
              </th>
              <th scope="col" className="px-6 py-3">
                是否到账
              </th>
              <th scope="col" className="px-6 py-3">
                到账金额
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr className="bg-white border-b" key={result.addr}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {result.addr}
                </th>
                <td className="px-6 py-4">{result.status}</td>
                <td className="px-6 py-4">{result.usdValue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
