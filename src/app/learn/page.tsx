'use client'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import React, { useState } from 'react'

const page = () => {
  const [refString, setrefString] = useState<string>('1 0 2 0 2 0 3 2 4')
  const [frames, setFrames] = useState<string>('3')
  const [error, seterror] = useState<string>('')
  const [result, setresult] = useState<any>(null)
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (refString.length === 0 || frames.length === 0) {
      seterror('Please fill all the fields')
      return;
    }

    const res = await axios.post('/api/lru', {
      refString,
      frames
    });
    console.log(res)
    setresult(res)
    setrefString('')
    setFrames('')

  }

  return (
    <div className="min-h-screen font-sans flex flex-col items-center justify-center p-4">
      <form
        onSubmit={(e) => { submitHandler(e) }}
        onChange={() => { seterror('') }}
        className=" p-10 rounded-lg shadow-xl w-full max-w-lg"
      >
        <h1 className="text-5xl font-extrabold mb-8 text-center text-gray-400">LRU Page Replacement</h1>
        <Input
          type='string'
          pattern='^[\d\s]+$'
          value={refString}
          onChange={(e) => { setrefString(e.target.value) }}
          placeholder='Enter Reference String e.g : 1 0 2 0 2 0 3 2 4 '
          className="mb-6 p-4 border rounded w-full text-xl"
        />
        <Input
          type='string'
          pattern='^[1-9]\d*$'
          placeholder='Enter Number of Frames e.g : 3'
          value={frames}
          onChange={(e) => { setFrames((e.target.value)) }}
          className="mb-6 p-4 border rounded w-full text-xl"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded w-full text-xl transition duration-300"
        >
          Submit
        </button>
        {error && <p className='text-red-500 mt-6 text-xl'>{error}</p>}
      </form>
      {result && <div className="bg-slate-800 p-10 rounded-lg shadow-xl mt-10 w-full  transition-all duration-500 ease-in-out transform">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-400">Result</h1>
        <div className="mb-6 text-center">
          <p className="text-2xl">Frame Size: <span className="font-semibold">{result.data.frameCount}</span></p>
          <p className="text-2xl">Number of References: <span className="font-semibold">{result.data.refArr.length}</span></p>
          <p className="text-blue-500 text-xl">Blue is the sequence</p>
          <p className="text-red-500 text-xl">Red is the replaced value when page fault occurs</p>
        </div>
        <div>
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-400">Reference String</h2>
          <div className='flex justify-center space-x-3'>
            {result.data.refArr.map((e: number, i: number) => {
              return <div key={i} className='border-2 text-blue-500 border-black w-12 h-12 flex items-center justify-center text-xl'>{e}</div>
            })}
          </div>
        </div>
        <div className='flex justify-center space-x-6 mt-8'>
          {result.data.result.map((e: any, i: number) => {
            return <div key={i} className="flex flex-col space-y-3">
              {e.frames.map((f: any, j: number) => {
                return <div key={j} className={`${e.faultIdx == j && "bg-red-500"} border-2 border-black w-12 h-12 flex items-center justify-center text-xl transition-all duration-500 ease-in-out`}>{f}</div>
              })}
            </div>
          })}
        </div>
        <div className="mt-8 text-center">
          <p className="text-2xl text-green-500">Number of Hits: <span className="font-semibold">{result.data.result[result.data.result.length-1].hits}</span></p>
          <p className="text-2xl text-red-500">Page Faults: <span className="font-semibold">{result.data.result[result.data.result.length-1].faults}</span></p>
          <p className="text-2xl text-gray-800">Hit Rate: <span className="font-semibold">{((result.data.result[result.data.result.length-1].hits / result.data.refArr.length) * 100).toFixed(2)}%</span></p>
        </div>
      </div>}
    </div>
  )
}

export default page
