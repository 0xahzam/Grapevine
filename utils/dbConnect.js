import { connect } from "mongoose";

const url =
  "mongodb+srv://NadaFarook:nada19@neog-cluster.wbp3g.mongodb.net/declutr?retryWrites=true&w=majority";
async function initializeDBConnection() {
  // Connecting to DB

  try {
    await connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Server starting...");
  } catch (error) {
    console.log(error);
  }
}
export default { initializeDBConnection };
