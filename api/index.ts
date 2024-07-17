import Express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = Express();
const port = 3000;

const mongoURI = process.env.MONGO_URI || "";

mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Could not connect to MongoDB Atlas", err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
  res.status(200).send({ status: 1 });
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (err) {
    res.status(500).send({ error: "Failed to fetch users" });
  }
});

app.post("/add-mock-user", async (req, res) => {
  try {
    const mockUser = new User({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password123",
    });

    const savedUser = await mockUser.save();
    res.status(201).send(savedUser);
  } catch (err) {
    res.status(500).send({ error: "Failed to create mock user" });
  }
});

app.listen(port, () => console.log("Server ready on port 3000."));
