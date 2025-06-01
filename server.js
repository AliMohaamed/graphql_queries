import express from 'express';
import dotenv from 'dotenv';
import connectDB from './database/connection.js';
import { graphqlHTTP } from 'express-graphql';
import schema from './graphGL/schema.js';

dotenv.config();
connectDB();
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


// GraphQL endpoint
app.use('/graphql', graphqlHTTP((req,res)=>{
    return{
        schema,
        graphiql: true,

    }
}))

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});