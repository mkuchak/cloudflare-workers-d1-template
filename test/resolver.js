function Resolver(path, options) {
  return options.defaultResolver(path, {
    ...options,
    packageFilter: (pkg) => {
      if (pkg.name === "nanoid") {
        delete pkg.exports;
        delete pkg.module;
      }
      return pkg;
    },
  });
}

module.exports = Resolver;
