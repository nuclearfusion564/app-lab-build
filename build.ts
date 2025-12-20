import fs from "fs";
import path from "path";

const indexJSFilePath = path.join("src", "index.js");

if (!fs.existsSync(indexJSFilePath)) {
  console.error("index.js doesn't exist");
  process.exit(1);
}

const content = fs.readFileSync(indexJSFilePath, "utf-8");
const lines = content.split("\n");

let output = "";

lines.forEach((line) => {
  if (line.trim().startsWith("// @include")) {
    const statements = line.split(" ");
    const fileName = statements[2]; // Assigning variable for statements[2] for readability

    const utilFilePath = path.join("src", "utils", fileName);

    if (!fs.existsSync(utilFilePath)) {
      console.error(utilFilePath + " isn't a valid path");
      process.exit(1);
    }
    const utilFileContent = fs.readFileSync(utilFilePath, "utf-8");

    output += `// ==== ${fileName} ====\n`;
    output += utilFileContent + "\n\n";
    console.log("Including " + fileName)
  } else {
    output += line + "\n";
  }
});

fs.writeFileSync("./output.js", output);
console.log("Build complete");

