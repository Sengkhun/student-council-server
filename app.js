import express from 'express';
import { graphqlUploadExpress } from 'graphql-upload';

// get env variables
import 'dotenv/config';
import connectDb from 'models';
import apollo from '/graphql';

const port = process.env.PORT;
const app = express();
app.use(
  graphqlUploadExpress({
    maxFileSize: 10000000,
    maxFiles: 10
  })
);
apollo.applyMiddleware({ app });

connectDb().then(async () => {
  await app.listen({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:${port}${apollo.graphqlPath}`);
  });
});