import './App.css';
import { useEffect, useState } from "react";
import axios from 'axios';

function App() {

  const client_id = "a19fc22348524d8d9c319cf8d6eb152b";
  const redirect_uri = "http://localhost:3000";
  const auth_endpoint = "https://accounts.spotify.com/authorize";
  const response_type = "token";

  const [token, setToken] = useState("")
  const [searchKey, setSearchKey] = useState("")
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if(!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem('token', token)
    }
    setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem('token');
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
        params: {
          q: searchKey,
          type: "artist"
        }
    })

    setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map(artist => (
      <div key={artist.id}>
      <div className="artist-image">
        {artist.images.length ? <img src={artist.images[0].url} alt=""/> : <div>No Image</div>}
        </div>
      <div className="artist-name">
        {artist.name}
      </div>
      </div>
    ))
  }

  return (
    <div className="App">
      <header className="App-header">
        <p class="logo-header">
          Spotify
        </p>
        {!token ?
        <a
          className="login-link"
          href={`${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=${response_type}`}>
          Log In
        </a>
        : <button class="logout" onClick={logout}>Log Out</button>}

        {token ?
        <form onSubmit={searchArtists}>
          <input type="text" onChange={e => setSearchKey(e.target.value)}/>
          <button type={"submit"}>Search</button>
        </form>

        : <p>Welcome to quick Spotify search. Please log in to search for artists or songs.</p>
        }

        {renderArtists()}

      </header>
    </div>
  );
  }

export default App;
