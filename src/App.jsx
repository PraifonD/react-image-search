import './App.css'
import Image from './Image'
import { useState } from 'react'

function App() {
  const [search, setSearch] = useState("")
  const [image, setImage] = useState([])
  const unsplashAccess = '';

  function searchImage(e){
    e.preventDefault()
    if(!search){
      alert("Please fill in")
    } else {
      fetchImageAPI()
    }
  }
  async function fetchImageAPI(){
    const url=`https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=${unsplashAccess}`
    const res = await fetch(url)
    const data = await res.json()
    const result = data.results
    if (result.length === 0) {
      alert(`there's no Image with this keyword`)
      setSearch('')
    } else {
      setImage(result)
      console.log(result)
    }
  }
  return (
    <>
      <h1>Image Searching Tool <span>&#128525;</span></h1>
      <form onSubmit={searchImage}>
        <input name='search' type='text' placeholder='Type Here' value={search} onChange={(e)=>setSearch(e.target.value)}></input>
        <button type='submit'>Search</button>
      </form>
      <div>
        {image.map((data,index)=>{
          return <Image {...data} key={index}/>
        })}
      </div>
    </>
  )
}

export default App
