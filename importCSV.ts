import csv from "csv-parser";
import readLine from "node:readline";
import fs from "fs";

async function getCSVLocation(): Promise<string> {
  return new Promise((resolve, reject) => {
    const rl = readLine.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("Input CSV file location: ", (answer) => {
      const fileLocation = answer.replaceAll(/["'`]/g, "");

      fs.access(fileLocation, fs.constants.F_OK, (err) => {
        console.error(err);
        reject(err);

        process.exit(1);
      });

      resolve(fileLocation);
    });
  });
}

async function loadCSV(filePath: string): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const importedData: unknown[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        importedData.push(row);
      }).on("end", () => {
        resolve(importedData);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}

async function main() {
  const fileLocation = await getCSVLocation();
  const importedData = await loadCSV(fileLocation);

  console.log(importedData)
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
