import app from "./app";
import { connectDatabase } from "./config/database";


const PORT = process.env.PORT || 3002;

 connectDatabase();

app.listen(PORT, () => {

  console.log(
    `Catalog service running on port ${PORT}` 
  );

});