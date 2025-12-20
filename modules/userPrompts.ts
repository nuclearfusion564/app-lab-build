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
        if (err) {
          console.error(err);
          rl.close();
          reject(err);
          return;
        }

        rl.close();
        resolve(fileLocation);
      });
    });
  });
}

async function getFileName(): Promise<string>{
    return new Promise((resolve) => {
        const rl = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question("Input filename: ", answer => {
            resolve(answer);
            rl.close();
        });
    })
}

export { getCSVLocation, getFileName }
