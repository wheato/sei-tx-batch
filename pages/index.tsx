import { Inter } from 'next/font/google'
import { useState } from 'react';
import dayjs from 'dayjs';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [results, setResults] = useState<any[]>([]);
  const [inputs, setInputs] = useState('');
  const [loading, setLoading] = useState(false);

  const onQuery = async () => {
    if (!inputs.trim() || loading) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/sei', {
        method: 'POST',
        body: inputs,
      });
      
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.log(err);
      alert('网络错误！')
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      className={`flex min-h-screen flex-col px-24 py-12 ${inter.className}`}
    >
      <h2 className="mb-4 text-3xl font-extrabold text-center leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
        Sei 跨链到账批量查询
      </h2>
      <p className="flex justify-end text-left inline">
        <a
          href="https://twitter.com/cc_loky"
          target="_blank"
          className="flex items-center text-blue-600 text-sm dark:text-blue-500 hover:underline"
        >
          <svg
            className="w-4 h-4 mr-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 17"
          >
            <path
              fill-rule="evenodd"
              d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
              clip-rule="evenodd"
            />
          </svg>
          欢迎关注我的 Twitter，DDDD
        </a>
      </p>
      <div className="block mb-2 text-sm font-medium text-gray-300 dark:text-gray-800 text-left">
        填写要查询的 Sei 地址 (受限于服务器限制，一次最多查询 50 个)
      </div>
      <textarea
        id="message"
        rows={15}
        className="block p-2.5 mb-4 w-full text-sm text-gray-900 bg-gray-100 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="填写 Sei 地址，一行一个地址"
        onChange={(e) => setInputs(e.target.value)}
      ></textarea>
      <div className="mb-8">
        {loading ? (
          <button
            disabled
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
            Loading...
          </button>
        ) : (
          <button
            onClick={onQuery}
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none"
          >
            查询
          </button>
        )}
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
              <th scope="col" className="px-6 py-3">
                到账时间
              </th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr className="bg-white border-b" key={result.address}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {result.address}
                </th>
                <td
                  className={`px-6 py-4 ${
                    result.status > 0
                      ? "text-green-600"
                      : result.status === -1
                      ? "text-red-600"
                      : "text-orange-500"
                  }`}
                >
                  {result.status > 0
                    ? "成功"
                    : result.status === -1
                    ? "错误"
                    : "未到账"}
                </td>
                <td className="px-6 py-4">
                  {result.usdValue ? `$${result.usdValue}` : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {result.timestamp
                    ? `${dayjs(result.timestamp).format("YYYY-MM-DD HH:mm:ss")}`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
