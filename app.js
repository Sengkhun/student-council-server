import express from 'express';

// get env variables
import 'dotenv/config';

const app = express();
const port = process.env.PORT;

app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://localhost:${port}`);
});