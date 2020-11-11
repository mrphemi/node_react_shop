import mongoose from "mongoose";
import Chalk from "chalk";

import config from "../config";

export default function setupDatabase(app) {
  const port = config.port;
  mongoose.Promise = global.Promise;

  mongoose
    .connect(config.databaseUrl, { useNewUrlParser: true })
    .catch((err) => {
      console.log(err);
    });

  mongoose.connection.once("open", () => {
    console.log(`${Chalk.green("Connected to database")}`);
    // Listen for incoming requests
    app.listen(port, () => {
      console.log(
        `${Chalk.blue(`Project running on http://localhost:${port}`)}`,
      );
    });
  });
}
