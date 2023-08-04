import mongoose from "mongoose";
import config from "config";
import log from "./logger";

async function connectToDb() {
  const dbUri = config.get<string>("dbUri");

  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    log.info("Connected to DB");
  } catch (e) {
    log.error(e);
    process.exit(1);
  }
}

export default connectToDb;
