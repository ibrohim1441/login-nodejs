
import { userRouter } from "./routers/user.routes.js";
import express, { urlencoded } from "express";
import methodOverride from "method-override";
import jwt from "jsonwebtoken";
import path from "path";
import ejs from "ejs";
// import fileUpload from "express-fileupload";

const app = express();


const PORT = 7070;

// app.engine("html", ejs.renderFile);
// app.set("view engine", "html");
// app.set(".html", path.join(process.cwd(), "views"));



// app.use(fileUpload({ limits: { fileSize: 1024 * 512 } }));

app.use(express.json());
app.use(methodOverride("_method"));
app.use(urlencoded({ extended: true }));
app.use(express.static(process.cwd() + "/public"));
app.use("/users", userRouter);






app.get("/*", (req, res) => {
  let url = req.url.slice(1);
  if (url == "favicon.ico")
    return res.sendFile(process.cwd() + "/public/images/logo.jpg");
  res.render(url);
});

app.listen(PORT);
console.log("Server running http://localhost:" + PORT + "/register");
