import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
const app = express();

// connecting the database with mongoose

mongoose
  .connect(
    "mongodb+srv://notorioussingh002:singh123@cluster0.zzlu9pk.mongodb.net/",
    {
      dbName: "backend",
    }
  )
  .then(() => console.log("Database conected"))
  .catch((e) => console.log(e));

// setting up view engine
app.set("view engine", "ejs");

// using a middilewares
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));

// using cookie-parser as middleware here
app.use(cookieParser());

//
//
//
//

// fuction that act as a middleware for route in the authentication
const isAuthencated = async (req, res, next) => {
  // accessing the cookies here
  // console.log(req.cookies.token);
  const token = req.cookies.token;
  if (token) {
    // decoding the token here
    const decodeToken = jwt.verify(token, "notorious");
    // console.log(decodeToken);
    // storing information of user forever
    req.user = await User.findById(decodeToken._id);
    next();
    // res.render("Authentication/logout.ejs");
  } else {
    res.render("Authentication/login.ejs");
  }
};

//
//
//

app.get("/", (req, res) => {
  res.send("Hello everyone!");
});

// 1. how to send data to ejs file
app.get("/dynamicData", (req, res) => {
  res.render("index.ejs", { name: "singh" });
});

let bowl = ["apple", "banana", "grapes"];

// 2.
app.get("/dynamicData2", (req, res) => {
  res.render("index.ejs", { fruits: bowl });
});

// 3.dynamic conditonal based data sendin
app.get("/dynamicData3", (req, res) => {
  const data = {
    title: "EJS TAGS",
    seconds: new Date().getSeconds(),
    items: ["apple", "banana", "cherry"],
    htmlContent: "<em>This is some TExt</em>",
  };
  res.render("conditionalBased.ejs", data);
});

//
//
//
//

//4. from client to server side data manupulation

app.get("/ClientToServer", (req, res) => {
  res.render("ClientToServer.ejs");
});

app.post("/submit", async (req, res) => {
  //  body parser will be used to access the body of the request url
  const numLetters = req.body["fName"].length + req.body["lName"].length;
  // console.log(numLetters);
  const { fName, lName } = req.body;
  await Message.create({ name: fName, lastname: lName });
  // data send to .ejs file
  res.render("ClientToServer.ejs", {
    numLetters: numLetters,
  });
});

// 5. how to get static files these types of files are stored in public folder

//
//
//
//
//

// 6. storing files in  mongodb

// 1.first cerate a schema
const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
});

// 2.create the model of data
const Message = mongoose.model("Message", messageSchema);

app.get("/mongo", async (req, res) => {
  // 3.sending the data to database
  await Message.create({ name: "singh2", lastname: "singh@gmial2.com" });
  res.send("nice");
});

//
//
//
//
//
//
//

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

// 7. authentication
app.get("/auth", isAuthencated, (req, res) => {
  res.render("Authentication/logout.ejs", {
    name: req.user.firstName,
  });
});

// loign button is used to enter into the application with token pass
app.post("/login", async (req, res) => {
  // checking the name and email are working or not
  console.log(req.body);
  console.log(req.body.email);
  console.log(req.body.firstName);

  const { firstName, email } = req.body;
  const creatUser = await User.create({ firstName, email });

  // creating a token with jsonwebtoken
  const token = jwt.sign({ _id: creatUser._id }, "notorious"); // the last "" is the seceret

  // seeting up the cokkie
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 1000), // to make it more secure msg can be seen only at server side
  });

  res.redirect("/auth");
});

// a logout button is required to exits the application
app.get("/logout", async (req, res) => {
  res.cookie("token", null, {
    httpOnly: true,
    expires: new Date(Date.now()), // to make it more secure msg can be seen only at server side
  });
  res.redirect("/auth");
});

// authentication ends here

// defining port here
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
