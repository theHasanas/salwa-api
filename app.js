const express = require("express");
const cors = require("cors");

//db
const db = require("./db/models");

//path
const path = require("path");

//route
const cookieRoutes = require("./API/cookie/routes");
const bakeryRoutes = require("./API/Bakery/routes");
const userRoutes = require("./API/user/routes");

//passpport
const passport = require("passport");

// Passport Strategies
const { localStrategy } = require("./middleware/passport");

const app = express();

//middleware
app.use(cors());
app.use(express.json());

// Passport Setup
app.use(passport.initialize());
passport.use(localStrategy);

//handling errors
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

//***********************routes**********************
app.use("/cookies", cookieRoutes);
app.use("/bakeries", bakeryRoutes);
app.use("/", userRoutes);

app.use("/media", express.static(path.join(__dirname, "media")));

//*******************Path Not Found******************
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

const run = async () => {
  try {
    await db.sequelize.sync();
    // await db.sequelize.sync({ force: true });
    console.log("Connection to the database successful!");
    await app.listen(8000, () => {
      console.log("The application is running on localhost:8000");
    });
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
};

run();
