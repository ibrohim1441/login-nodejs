import fs from "fs";
export function readFile(fileName) {
    return JSON.parse(
        fs.readFileSync(
            process.cwd() + "/database/" + fileName + ".json",
            "utf-8"
        )
    );
}
export function writeFile(fileName, data) {
    fs.writeFileSync(
        process.cwd() + "/database/" + fileName + ".json",
        JSON.stringify(data, null, 4)
    );
}
