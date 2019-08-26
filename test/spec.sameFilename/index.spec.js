const { createBundler, createTester } = require("../utils");

const tester = createTester(__dirname);

describe("many files with the same filename", () => {
  beforeEach(() => {
    tester.cleanDist();
  });

  test("two files with the same filename", async () => {
    await createBundler(__dirname + "/index.html", tester.option).bundle();

    const json = await tester.readManifest();
    expect(json).toHaveProperty("files");

    const files = json.files;
    expect(Object.keys(files)).toHaveLength(3);
    expect(files["index.html"]).toBeTruthy();
    expect(files["script.js"]).toBeTruthy();
    expect(files["sub/script.js"]).toBeTruthy();
  });
});
