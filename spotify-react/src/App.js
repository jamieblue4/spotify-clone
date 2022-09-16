import './App.css';

function App() {

const client_ID = "93224a7aa0fa499588b20dffa7644ef1";
const redirect_URI = "http://localhost:3000";
const auth_endPoint = "https://accounts.spotify.com/authorize";
const response_type = "token";

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Welcome to Spotify.
        </p>
        <a
          className="login-link"
          href={`${auth_endPoint}?client_id=${client_ID}&redirect_uri=${redirect_URI}&response_type=${response_type}`}>
          Log In
        </a>
      </header>
    </div>
  );
}

export default App;
