import {lru} from "@/helpers/lru.js"
import { NextRequest, NextResponse } from "next/server";

export async function POST(request : NextRequest){
    const {refString, frames} = await request.json() ;
    const refArr = refString.split(' ').map((e : string)=>parseInt(e))
    const frameCount = parseInt(frames)
    const result = lru(refArr, frameCount)
    return NextResponse.json({
        result,
        refArr,
        frameCount
    } , {
        status: 200
    })
}