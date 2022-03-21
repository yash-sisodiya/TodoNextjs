import { ApolloClient, InMemoryCache } from "@apollo/client";
const apolloClient = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_SERVER_ENDPOINT,
    // uri:"https://fruits-api.netlify.app/graphql",
    cache: new InMemoryCache({ resultCaching: false }),
});
export default apolloClient