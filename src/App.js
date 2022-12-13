import React, {Suspense} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
let pages = ['./D3', './D3', './D3']
let routes = []
const getComponent = (path) => {
  const Component = React.lazy(() => import(`${path}`));
  return Component;
};

pages.map((page, index)=> {
  let route = index === 0 ? '/': `/route${index}`;
  let routeObj = {};
  routeObj.path = route;
  routeObj.component = getComponent(page);
  routes = [routeObj, ...routes];
  console.log(routes);
 return false; 
});

function App() {
  return (
    <Router>
      <div className="App">
      <Suspense fallback='loading...'>
        <Routes>
          {routes.map((route, i) => (
            <Route
              key={i}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
