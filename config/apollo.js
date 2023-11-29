import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({ //Donde el server de apollo
    uri: "http://localhost:4000",
    fetch
  })
})

export default client