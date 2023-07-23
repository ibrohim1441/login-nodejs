import { readFile, writeFile } from "../utils/fs.js";
import jwt from "jsonwebtoken";

// GET users
export function GET(req, res) {
  try {
    res.send({
      status: 200,
      message: "success",
      data: req.params?.id
        ? readFile("users").find((b) => b.id == req.params.id)
        : readFile("users")
    });
  } catch (er) {
    res.send({
      status: 404,
      message: er.message,
      data: null
    });
  }
}

// Search by id users
export function GETID(req, res) {
  try {
    const { id } = req.params;
    if (isNaN(+id)) throw new Error("Id invalid");
    let User = readFile("users").find((u) => u.id == id);
    if (!User) throw new Error("Not foyund User " + id);
    res.send({
      status: 200,
      message: "success",
      data: User
    });
  } catch (er) {
    res.send({
      status: 404,
      message: er.message,
      data: null
    });
  }
}

// Login for seeing users
export function LOGIN(req, res) {
  
  try {

    res.send({
      status: 201,
      message: "LOGIN ",
      data: jwt.sign({ token: 12 }, "Secret", {
        expiresIn: "30000"
      })
    });
    
  } catch (er) {
    res.send({
      status: 404,
      message: er.message,
      data: null
    });
  }
}

// Register
export function REGISTER(req, res) {
  try {
    const { name, phone, job } = req.body;
    

    const users = readFile("users");
    const newUser = {
      id: users.length ? users.at(-1).id + 1 : 1,
      ...req.body
    };
    users.push(newUser);
    writeFile("users", users);
    res.send({
      status: 201,
      message: "Add User ",
      data: jwt.sign({ token: newUser.id }, "Secret")
    });
  } catch (er) {
    res.send({
      status: 404,
      message: er.message,
      data: null
    });
  }
}

export function POST(req, res) {
  try {
    console.log(req.body);
    const { name, address, user_id, imageLink, contact, telegram } = req.body;
    const img = readFile("images");
    let imgMap = img.map((elImg) => elImg.link);

    const users = readFile("users");
    const newusers = {
      id: users.length ? users.at(-1).id + 1 : 1,
      user_id: users.length ? users.at(-1).user_id + 1 : 1,
      imageLink: imgMap,
      ...req.body,
    };

    users.push(newusers);
    writeFile("users", users);

    res.send({
      status: 201,
      message: "Add ussers ",
      data: users,
    });
  } catch (er) {
    res.send({
      status: 404,
      message: er.message,
      data: null,
    });
  }
}

// Update users
export function PUT(req, res) {

  try {
    let users = readFile("users");
    let user = users.find((u) => u.id == req.params.id);
    let { user_name, age,  email, password, contact, institute } = req.body;
    user.user_name = user_name || user.user_name;
    user.age = age || user.age;
    user.email = email || user.email;
    user.password = password || user.password;
    user.contact = contact || user.contact;
    user.institute = institute || user.institute;
    writeFile("users", users);

    res.send({
      status: 201,
      message: "Change users ",
      data: users,
    });
  } catch (er) {
    res.send({
      status: 404,
      message: er.message,
      data: null
    });
  }
}


export function DELETE(req, res) {
  try {
    const { id } = req.params;
    const users = readFile("users");
    const updatedUsers = users.filter((user) => user.id !== parseInt(id));
    if (updatedUsers.length === users.length) {
      throw new Error(`User with ID ${id} not found`);
    }
    writeFile("users", updatedUsers);
    res.send({
      status: 200,
      message: "User deleted successfully",
      data: null,
    });
  } catch (error) {
    res.send({
      status: 404,
      message: error.message,
      data: null,
    });
  }
}




