// Load dependencies
const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");

// Load configuration from .env file
dotenv.config();

// Create express app instance
const app = express();

// Configure app settings
app.set("port", process.env.PORT || 3000);

// Configure app middleware
app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: {
        httpOnly: true,
      },
    })
  );

  app.use((req, res, next) => {
    if (!req.session.tasks) {
      req.session.tasks = [];
    }
    next();
  });
app.use(express.json());
app.use(express.static("./public"));
//suivre les sessiosns
app.use((req,res,next)=>{
  if(!req.session.count)
      req.session.count=1
  else
      req.session.count++
  console.log(req.session)
  next()
})

// Register application routes
const taskRoute = require("./routes/tasks");
app.use("/task", taskRoute);


// Start server
app.listen(app.get("port"), () => {
  console.log(`Server started on port ${app.get("port")}`);
});
