require("dotenv").config();
const connectDB = require("./db/db");
const app = require("./app");

const PORT = process.env.PORT || 8000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

});