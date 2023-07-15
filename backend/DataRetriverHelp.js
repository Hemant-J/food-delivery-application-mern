const dbConnect = async () => {
  let db = null;
  try {
    /** In real-time you'll split DB connection(into another file) away from DB calls */
    //await mongoose.connect(url, { useNewUrlParser: true }); // await on a step makes process to wait until it's done/ err'd out.
    db = mongoose.connection;

    let dbResp = await User.find(
      {}
    ).lean(); /** Gets all documents out of users collection.
                                 Using .lean() to convert MongoDB documents to raw Js objects for accessing further. */

    db.close(); // Needs to close connection, In general you don't close & re-create often. But needed for test scripts - You might use connection pooling in real-time.
    return dbResp;
  } catch (err) {
    db && db.close(); /** Needs to close connection -
                 Only if mongoose.connect() is success & fails after it, as db connection is established by then. */

    console.log("Error at dbConnect ::", err);
    throw err;
  }
};

dbConnect()
  .then((res) => console.log("Printing at callee ::", res))
  .catch((err) => console.log("Err at Call ::", err));

/** WHEN WE NEED DATA FROM MONGOOSE OF COLLECTION OF WHICH SCHEMA AND MODEL IS DEFINED */
