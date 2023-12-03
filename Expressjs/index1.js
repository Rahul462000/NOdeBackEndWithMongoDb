import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const app = express();

// connnection of the database

mongoose
  .connect(
    "mongodb+srv://notorioussingh002:singh123@cluster0.zzlu9pk.mongodb.net/",
    {
      dbName: "fullapplicaiotn",
    }
  )
  .then(() => console.log("Database Connection established"))
  .catch((e) => console.log(e));

// setting up view engine
app.set("view engine", "ejs");

// using a middilewares
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));

// using cookie-parser as middleware here
app.use(cookieParser());

const Authentication = async (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    const decodeToken = jwt.verify(token, "notorious");
    // console.log(decodeToken);
    // storing information of user forever
    req.user = await User.findById(decodeToken._id);
    next();
    // res.render("Authentication/logout.ejs");
  } else {
    res.redirect("/login");
  }
};

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

app.get("/", Authentication, (req, res) => {
  res.render("logout.ejs", {
    name: req.user.firstName,
  });
});
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

// for the login page
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let creatUser = await User.findOne({ email });
  if (!creatUser) return res.redirect("/register");
  const isMatch = await bcrypt.compare(password, creatUser.password);

  if (!isMatch) {
    return res.render("login", { email, message: "Incorrect password" });
  }
  const token = jwt.sign({ _id: creatUser._id }, "notorious"); // the last "" is the seceret

  // seeting up the cokkie
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000), // to make it more secure msg can be seen only at server side
  });

  res.redirect("/");
});

app.post("/register", async (req, res) => {
  // checking the name and email are working or not
  // console.log(req.body);
  // console.log(req.body.email);
  // console.log(req.body.firstName);
  const { firstName, email, password } = req.body;
  // to check for the existence of user
  let creatUser = await User.findOne({ email });
  if (creatUser) {
    return res.redirect("/login");
  }

  // hashing the password
  const hashPassword = await bcrypt.hash(password, 10);
  creatUser = await User.create({ firstName, email, password: hashPassword });

  // creating a token with jsonwebtoken
  const token = jwt.sign({ _id: creatUser._id }, "notorious"); // the last "" is the seceret

  // seeting up the cokkie
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000), // to make it more secure msg can be seen only at server side
  });

  res.redirect("/");
});

// a logout button is required to exits the application
app.get("/logout", async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()), // to make it more secure msg can be seen only at server side
  });
  res.redirect("/");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
