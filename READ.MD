# About This Project
This is a tool to help manage large app lab projects by allowing developers to split up their code into multiple files and allowing you to easily put it back into one file to easily copy and paste it back into app lab.

**Note: I'm not affiliated with code.org, I'm just a passionate programming student who finds App Lab a little too limiting.**

# How it works
Your main app lab code lives in "src/index.js" and any additional code must go into the "utils" directory. 

In order to include your utility files into index.js, you must use this marker:
```js
// @include <file_name.extension>
```
This marker is used to specify where in your main file  your utility file should go in the build process. The extension can be any text file extension, but ".js" is recommended.

To combine all of your files into one file, open your terminal and run:
```bash
npm run build
```
This will create an output.js file with all of your files combined so you can paste it into app lab and test your code.
# How to install
Installation is really easy, but you need to have the following installed already.
- Git: Only required to clone the repository. Optional if you download the repository manually.
- Node.js: Node.js is required to run "npm run build."

Once you have these dependencies installed, you must open your terminal and clone the repository to your system by running:
```bash
git clone https://github.com/nuclearfusion564/app-lab-build
```
Then you must install any additional dependencies by running:
```bash
npm install
```
