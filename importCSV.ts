import csv from "csv-parser";
import fs from "fs";
import { getCSVLocation, getFileName } from "./modules/userPrompts.ts";

type newRow = { [key: string]: any };

async function loadCSV(filePath: string): Promise<newRow[]> {
  return new Promise((resolve, reject) => {
    const importedData: newRow[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        importedData.push(row);
      })
      .on("end", () => {
        resolve(importedData);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function main() {
  const fileLocation = await getCSVLocation();
  const importedData: newRow[] = await loadCSV(fileLocation);
  const fileName = await getFileName();
  const newFileLocation = "./src/utils/" + fileName;

  let output = "";

  output += `var data = [`

  importedData.forEach((element) => {
    output += ',\n   {'

    const elementKeys = Object.keys(element);

    for (let i = 0; i < elementKeys.length; i++) {
      if (elementKeys[i].includes(" ")) {
        output += `\n    '${elementKeys[i]}': '${element[elementKeys[i]]}',`;
        continue;
      }
      output += `\n     ${elementKeys[i]}: '${element[elementKeys[i]]}',`;

      if (i === elementKeys.length - 1){ // To make sure that it's the last item
        output += "\n   }"
      }
    }
  });

  output += "\n];"

  fs.writeFileSync(newFileLocation, output);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
