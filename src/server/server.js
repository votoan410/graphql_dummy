const { ApolloServer, gql } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const express = require("express");
const http = require("http");
const { argsToArgsConfig } = require("graphql/type/definition");

async function startApolloServer(typeDefs, resolvers) {
  const app = express();

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  server.applyMiddleware({ app });

  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

const typeDefs = gql`
  type Query {
    message: String
    year: Int
    person: Person
    people: [Person]
    todos(id: String): [Todo]
    sport: String
    income: Int
  }
  type Todo {
    task: String
    id: String
    person: String
  }
  type Person {
    name: String
    age: Int
  }
`;
const todos = [
  { task: "cook food", id: "2321", person: "Mike" },
  { task: "clean", id: "600", person: "Jack" },
  { task: "wash", id: "400", person: "Mello" },
];

const people = [
  { name: "Makkzz", age: 24 },
  { name: "Mello", age: 29 },
];

const p1 = {
  name: "Makk",
  age: 25,
};
const p2 = {
  name: "Jello",
  age: 21,
};
const p3 = {
  name: "Jack",
  age: 55,
};
// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    message: () => {
      return "hey";
    },
    year: () => {
      return 2022;
    },
    person: () => {
      return p1;
    },
    people: () => {
      return [p1, p2, p3];
    },
    todos: (_, args) => {
      if (args.id) {
        return [todos.find((item) => item.id === args.id)];
      }
      return todos;
    },
    sport: () => {
      return "Soccer";
    },
    income: () => {
      return 400000;
    },
  },
};

startApolloServer(typeDefs, resolvers);
