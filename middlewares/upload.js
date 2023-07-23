import { readFile, writeFile } from "../utils/fs.js";
import fs from "fs";
import path from "path";

export const upload = (req, res, next) => {
  try {
    let { image } = req.files;
    let { name, mimetype, size, md5 } = image;
    if (!fs.existsSync(path.join(process.cwd(), "images")))
      fs.mkdirSync(path.join(process.cwd(), "images"));
    let extname = image.name.split(".");
    if (image.truncated) throw new Error("Filening hajmi  katta");
    let ext = "." + extname[extname.length - 1];
    image.mv(path.join(process.cwd(), "images", image.md5 + ext));
    const images = readFile("image") || [];

    let imageData = {
      id: images.at(-1)?.id + 1 || 1,
      name,
      mimetype,
      size,
      md5,
      link: "/" + md5 + ext,
      downloadlink: "/download/" + images.md5 + ext,
    };
    console.log(imageData);

    images.push(imageData);
    writeFile("images", images);
    req.id = imageData.id;
    return next();
  } catch (err) {
    res.send({
      status: 429,
      message: err.message,
    });
  }
};
