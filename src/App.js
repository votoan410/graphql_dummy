import logo from "./logo.svg";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import { useEffect } from "react";

function App() {
  const GET_QUERY = gql`
    query Query {
      message
      year
      person {
        name
        age
      }
      people {
        age
        name
      }
      todos {
        task
        id
        person
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_QUERY);
  useEffect(() => {
    console.log(data);
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :( </p>;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          UseQuery Graphql result:
        </a>
        {data.todos.map((todo) => {
          return (
            <div key={todo.id} className="App">
              {todo.task}
            </div>
          );
        })}
      </header>
    </div>
  );
}

export default App;
