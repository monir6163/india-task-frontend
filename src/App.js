import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AllUser from './Pages/Home/AllUser/AllUser';
import Home from './Pages/Home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/alluser">
            <AllUser />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
