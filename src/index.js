import app from "./app";
import { PORT } from "./config.js";

app.listen(PORT);
console.log('Server listening on port', PORT);