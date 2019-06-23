const app = require("../server");
const syncDb = require("./sync-db");

const port = process.env.PORT || 3000;

syncDb()
  .then(() => {
    console.log("Sync database is complete.");
    app.listen(port, () => console.log(`Server is running on ${port}`));
  })
  .catch(console.error);
