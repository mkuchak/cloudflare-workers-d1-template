export default {
  esbuild: {
    bundle: true,
    minify: false,
    target: "es2021",
    platform: "node",
  },
  prebuild: async () => {
    const rimraf = (await import("rimraf")).default;
    rimraf.sync("./dist"); // clean up dist folder
  },
};
