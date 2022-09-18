import express, { application } from "express";
import { connectToPostgres } from "../src/configuration/postgres.connection";
import { registerMiddlewares } from "./routes/routes";
export const startServer = async () => {
  try {
    const app = express();
    await connectToPostgres();
    const PORT = process.env.PORT;

    registerMiddlewares(app);
    app.listen(PORT, () => {
      console.log(`Server Started at ${PORT}`);
    });
  } catch (e) {
    console.log(e);
    console.log("SOMETHING WENT WRONG");
    process.exit(1);
  }
};
