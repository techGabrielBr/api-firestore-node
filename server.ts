import app from "./src/app";
import "dotenv/config"

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server is running");
});