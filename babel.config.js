const presets = [
  [
    "@babel/preset-env",
    {
      // The browser versions where we want our code to be supported. This could
      // be adjusted to support more or less different browsers. Refer to
      // https://babeljs.io/docs/options#targets for details.
      targets: "defaults, IE 11, not dead",

      useBuiltIns: "entry",
      corejs: "^3",
    },
  ],
];

module.exports = { presets };
