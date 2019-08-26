const { createBundler, createTester } = require("../utils");

const tester = createTester(__dirname);

describe("single entry file", () => {
  beforeEach(() => {
    tester.cleanDist();
  });

  test("html", async () => {
    await createBundler(__dirname + "/index.html", tester.option).bundle();

    const json = await tester.readManifest();
    expect(json).toHaveProperty("files");

    const files = json.files;
    expect(Object.keys(files)).toHaveLength(1);
    expect(files["index.html"]).toBeTruthy();
  });

  test("javascript", async () => {
    await createBundler(__dirname + "/script.js", tester.option).bundle();

    const json = await tester.readManifest();
    expect(json).toHaveProperty("files");

    const files = json.files;
    expect(Object.keys(files)).toHaveLength(2);
    expect(files["script.js"]).toBeTruthy();
    expect(files["script.js.map"]).toBeTruthy();
  });

  test("css", async () => {
    await createBundler(__dirname + "/style.css", tester.option).bundle();

    const json = await tester.readManifest();
    expect(json).toHaveProperty("files");

    const files = json.files;
    expect(Object.keys(files)).toHaveLength(2);
    expect(files["style.css"]).toBeTruthy();
    expect(files["style.css.map"]).toBeTruthy();
  });
});
