import { NextRequest , NextResponse } from 'next/server'
import { ImageResponse } from '@vercel/og'


export const config = {
    runtime : 'experimental-edge'
}

const handle = (req : NextRequest) => {
    const { searchParams } = new URL(req.url)
    
    const title = searchParams.get('title') || "Adventure of Palash Bauri"
    const blog = searchParams.get('blog') || "Adventure of Palash Bauri"
    const date = new Date(searchParams.get('date') || "2022-11-13T12:00:00.000Z")
    const username =  searchParams.get('gh') || "bauripalash"
    
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
              src={`https://github.com/${username}.png`}
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
                fontSize : 80,
                marginRight: 10,
                color : '#16213E',
                wordWrap : 'break-word',
                flexWrap : 'wrap'
            }} >{title}</p>
            <small style={{
                fontSize: 20,
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

export default handle