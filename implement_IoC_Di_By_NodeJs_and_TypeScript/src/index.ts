import express from "express";
import { setupController } from "./core/utils/setupController";
import { UserController } from "./domain/user/controller";

const PORT = 3000;

const app = express();

setupController(app, [UserController]);

const router = express.Router();
router.get("/", (req, res) => {
  console.log("sgsg");
  return res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
