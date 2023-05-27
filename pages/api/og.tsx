import { NextRequest } from 'next/server'
import { ImageResponse } from '@vercel/og'

export const config = {
    runtime : 'edge'
}

function is_debug() : boolean{
  return process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test";
}

export default async function handle(req : NextRequest){
    const { searchParams } = new URL(req.url)
    
    let currentUrl = 'https://b.og.palashbauri.in';
    if (is_debug()) {
      currentUrl = 'http://localhost:3000'
    }

    const title = searchParams.get('title') || "Adventure of Palash Bauri"
    const blog = searchParams.get('blog') || "Adventure of Palash Bauri"
    const date = new Date(searchParams.get('date') || "2022-11-13T12:00:00.000Z")
    
    return new ImageResponse(
        (
          <div
            style={{
              display: 'flex',
              color: 'black',
              background: '#f6f6f6',
              width: '100%',
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div style={{
                display : 'flex',
                alignItems : 'center',
                color: '#FF577F'
                
            }}>
            <img
              width="80"
              height="80"
              src={`${currentUrl}/logo.png`}
              style={{
                borderRadius: 128,
                flexGrow:0,
                flexShrink:0,
                marginRight:10,
              }}
            />
            <p style={{
                fontSize:30
            }} >{blog}</p>
            </div>
            <p style={{
                fontSize : 65,
                padding: 20,
                margin: 20,
                textAlign: "center",
                justifyContent: "center",
                color : 'black',
                wordWrap : 'break-word',
                flexWrap : 'wrap'
            }} >{title}</p>
            <small style={{
                fontSize: 20,
                marginTop: 50,
                color:'#256D85'
            }}>Published on, {date.toLocaleDateString('en-US', { dateStyle: 'long' })}</small>
          </div>
        ),
        {
          width: 1200,
          height: 630,
          
        },
      );
}
