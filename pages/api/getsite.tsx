import { NextRequest, NextResponse } from "next/server";
import {parse} from 'node-html-parser'

export const config = {
    runtime : 'experimental-edge'
}

interface PostData {
    title : string,
    published : string,
    blog : string
}

async function getPostData(src : string){
    const x = parse(src)
    const item = x.querySelector('script[type="application/ld+json"]')
    const jsonObj = JSON.parse(item?.text || "")
    const title = jsonObj.name 
    const published = jsonObj.datePublished 
    const blog = jsonObj.publisher.name 
    const result : PostData = {
        title , published , blog
    }
    return result
    
    
}


export async function getSite(u : string){
    
        const response = await fetch(u) 
        //console.log(response)
        const rawData = await response.text()
        //console.log(rawData)
        return rawData  
   

}




export default async function handle(req : NextRequest){

    //try{
    const {searchParams} = new URL(req.url)
    const url = atob(searchParams.get('url') || "")

    const data = await getSite(url)
    const postInfo = await getPostData(data)
    //console.log)
    return NextResponse.json({
        ...postInfo
    })
    /*}catch{
        return NextResponse.json({
            "title" : null,
            "published" : null,
            "blog" : null
        })
    }
    */


    

   

}
