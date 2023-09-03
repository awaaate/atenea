const fs = require("fs");
const path = require("path");

const paths = `
./components/avatar
./components/badge
./components/button
./components/card
./components/icon
./components/banner
./components/skeleton
./components/spinner
./components/tabs
./components/toast
./components/toggle
./components/tooltip
./components/collapsible
./components/command-menu
./components/commands
./components/dialog
./components/dropdown-menu
./components/sidebar
./components/input
./components/separator
./components/scroll-area
./components/nav-item
./components/toolbar
./components/link
./components/slider
./components/background-picker
./components/popover
./components/form
./components/label
./components/accent-picker
./components/textarea
`;

paths
  .trim()
  .split("\n")
  .forEach(async (file) => {
    const fileName = file.split(" ")[1];
    const filePath = path.join(__dirname, "src", file);

    const newFile = path.join(__dirname, "src", file.split("/").pop() + ".ts");
    console.log(newFile);
    console.log(filePath);
    /*     const relativePath = path.relative(path.dirname(newFile), filePath);
    const fileContent = `
    export * from "./${relativePath.slice()}"
    `;
    fs.promises.writeFile(newFile, fileContent); */

    //remove old file
   // fs.promises.unlink(newFile);
  });
