const { createBundler, createTester } = require("../utils");

const tester = createTester(__dirname);

describe("multiple entry file", () => {
  beforeEach(() => {
    tester.cleanDist();
  });

  test("html", async () => {
    await createBundler(
      [__dirname + "/index.html", __dirname + "/index2.html"],
      tester.option
    ).bundle();

    const json = await tester.readManifest();
    expect(json).toHaveProperty("files");

    const files = json.files;
    expect(Object.keys(files)).toHaveLength(2);
    expect(files["index.html"]).toBeTruthy();
    expect(files["index2.html"]).toBeTruthy();
  });
});
