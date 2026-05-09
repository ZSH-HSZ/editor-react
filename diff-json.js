const fs = require("fs");

// 读取两个 JSON 文件
const json1 = JSON.parse(fs.readFileSync("./a.json", "utf8"));
const json2 = JSON.parse(fs.readFileSync("./b.json", "utf8"));

function diff(obj1, obj2, path = "") {
  const diffs = [];

  const keys = new Set([
    ...Object.keys(obj1 || {}),
    ...Object.keys(obj2 || {})
  ]);

  for (const key of keys) {
    const newPath = path ? `${path}.${key}` : key;

    const v1 = obj1 ? obj1[key] : undefined;
    const v2 = obj2 ? obj2[key] : undefined;

    const bothObjects =
      typeof v1 === "object" &&
      typeof v2 === "object" &&
      v1 !== null &&
      v2 !== null &&
      !Array.isArray(v1) &&
      !Array.isArray(v2);

    if (bothObjects) {
      diffs.push(...diff(v1, v2, newPath));
    } else if (JSON.stringify(v1) !== JSON.stringify(v2)) {
      diffs.push({
        path: newPath,
        value1: v1,
        value2: v2
      });
    }
  }

  return diffs;
}

const result = diff(json1, json2);

console.log("不同的地方：");
console.log(JSON.stringify(result, null, 2));