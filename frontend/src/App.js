import Navbar from './Navbar';
import Home from './Home';
import APIService from './services/APIService';


function App() {

  let apiService = APIService.getInstance()
  return (
    <div className="App">
      <Navbar />
      <div className="content">
        <Home  apiService={apiService} />
      </div>
    </div>
  );
}

export default App;
