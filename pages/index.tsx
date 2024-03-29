import React from "react";

function valid_token(token : string){
  if (!process.env.TOKEN){
    return true
  }
  if (process.env.TOKEN == token){
    return true
  }
  return false
}

function is_debug() : boolean{
  return process.env.NODE_ENV == "development" || process.env.NODE_ENV == "test";
}


async function fetchSiteData(u : string){
  const url = `/api/getsite/?url=${encodeURI(btoa(u))}`
  const resp = await fetch(url)
  const data = await resp.json()
  return data
  
}

function create_link(title : string , date : string , blog : string , gh : string , token : string){
  if (!valid_token(token)){
      return "[X] Invalid Token!"
  }
  const eTitle = encodeURI(title)
  const eDate = encodeURI(date)
  const eBlog = encodeURI(blog)
  const eGh = encodeURI(gh)
  if (is_debug()){
    return `/api/og/?title=${eTitle}&blog=${eBlog}&date=${eDate}&gh=${eGh}`
  }else{
    return `https://b.og.palashbauri.in/api/og/?title=${eTitle}&blog=${eBlog}&date=${eDate}&gh=${eGh}`
  }
}

function Page() {
  const date_obj = new Date()
  const [title , setTitle] = React.useState("A Blog by Palash Bauri")
  const [date , setDate] = React.useState(date_obj.toISOString())
  const [blog , setBlog] = React.useState("Adventure of Palash Bauri")
  const [gh , setGh] = React.useState("bauripalash")
  const [token , setToken] = React.useState("??")
  const [ output , setOutput]  = React.useState("https://")
  const [siteurl , setSiteurl] = React.useState("http://")
  

  function genLink() {
    setOutput(create_link(title , date , blog , gh , token))
  }

  function getData(){
    
    fetchSiteData(siteurl).then(d => {
      if (d != null){
        setTitle(d.title)
        setDate(d.published)
        setBlog(d.blog)
      }
    })
  }

  return(
    <div style={{
      marginLeft:"auto",
      marginRight:"auto",
      textAlign : "center"
      
    }}>
        <div className="row">
        <div className="col-25">URL:</div>
        <input type="text" name="url" id="urlinput" value={siteurl} onChange = { (e) => {
          setSiteurl(e.target.value)
        } } />
        <button onClick={getData}>Get Data</button>
        <hr/>
        <div className="col-25">
        <label htmlFor="title">Post Title : </label>
        </div>
        <div className="col-75">
        <input type="text" value={title} name="title" placeholder="Post Title" onChange={(e) => setTitle(e.target.value) } />
        </div>

        <div className="col-25"><label htmlFor="date">Post Date : </label></div>
        
        <div className="col-75"><input type="text" value={date} name ="date" placeholder="Post Date" onChange={(e) => setDate(e.target.value) }/>
        </div>

        <div className="col-25">
        <label htmlFor="blog">Posted on blog : </label></div>
        

        <div className="col-75">
        <input type="text" value={blog} name ="blog" placeholder="Blog" onChange={(e) => setBlog(e.target.value) }/>
        </div>
        <div className="col-25">
        <label htmlFor="gh">Github username: </label>
        </div>
        <div className="col-75">
        <input type="text" value={gh} name ="gh" placeholder="GH Username" onChange={(e) => setGh(e.target.value) }/>
        </div>
        <div className="col-25">
        <label htmlFor="token">Token: </label>
        </div>

        <div className="col-75">
        <input type="text" value={token} name ="token" placeholder="Token" onChange={(e) => setToken(e.target.value) }/>
        </div>
        <br />
        </div>

        
        <button onClick={genLink}>Get</button>
        <hr/>

        <div>
          <textarea value={output} readOnly name="output" ></textarea>
          <br />
          <br />
          <a href={output}>Link</a>
        </div>
    </div>
  )
}

export default function Home() {
  return (
    <div>
      Social/Header Image generator for <a href="https://palashbauri.in">palashbauri.in</a> 
      <hr/>
      <div className='container' > { Page() } </div>
     </div>
  )
}
