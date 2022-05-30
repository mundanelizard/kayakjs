import React from "react";
import ReactDOM from "react-dom";
import {Link, Route, Router, useParams, useRouter} from '@navey/web'

function Products() {
  return (
    <div>
      <h4>Example Products</h4>
      <ul>
        <li>
          <Link to="/products/1">Product One</Link>
        </li>
        <li>
          <Link to="/products/2">Product Two</Link>
        </li>
      </ul>
    </div>
  );
}

function Product() {
  const { id } = useParams()
  const route = useRouter()

  return (
    <div>
      <h4>Viewing product {id}</h4>
      <pre>{JSON.stringify(route)}</pre>
      <Link to="/">Back to all products</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Route path="/products/:id" component={Product} />
      <Route path="/" component={Products} exact />
    </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
