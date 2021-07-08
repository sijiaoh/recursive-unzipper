const { execSync } = require("child_process");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

const waitEnterAndExit = () => {
  process.stdin.resume();
  process.stdin.on("data", () => {
    process.exit(0);
  });
};

try {
  const targetDirectory = process.argv[2];
  if (!targetDirectory || !fs.statSync(targetDirectory).isDirectory()) {
    throw new Error("フォルダーを渡してください。");
  }

  const filePaths = [
    ...glob.sync(`${targetDirectory}/**/*.zip`),
    ...glob.sync(`${targetDirectory}/**/*.rar`),
    ...glob.sync(`${targetDirectory}/**/*.7z`),
  ];

  filePaths.forEach((filePath) => {
    const outputPath = path.dirname(filePath);
    execSync(
      `"C:\\Program Files\\7-Zip\\7z.exe" -aoa x "${filePath}" -o"${outputPath}"`
    );
    fs.rmdirSync(filePath, { recursive: true });
  });
  console.info("成功、Enterで終了。");
} catch (e) {
  console.error(e.message);
} finally {
  waitEnterAndExit();
}
