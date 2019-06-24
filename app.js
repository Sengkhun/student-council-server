import express from 'express';
import path from 'path';
import { graphqlUploadExpress } from 'graphql-upload';

// get env variables
import 'dotenv/config';
import connectDb from 'models';
import apollo from '/graphql';

import '/config';

const port = process.env.PORT;
const app = express();

// make public folder static
app.use('/static', express.static(path.join(__dirname, 'public')));

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