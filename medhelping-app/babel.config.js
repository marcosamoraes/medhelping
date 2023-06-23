module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      "nativewind/babel", 
      require.resolve("expo-router/babel"), 
      'module:react-native-dotenv',
      ["module-resolver", {
        "root": ["./"],
        "alias": {
          "@components": "./sources/components",
          "@constants": "./sources/constants",
          "@contexts": "./sources/contexts",
          "@interfaces": "./sources/interfaces",
          "@routes": "./sources/routes",
          "@schemas": "./sources/schemas",
          "@screens": "./sources/screens",
          "@services": "./sources/services",
          "@storage": "./sources/storage",
          "@styles": "./sources/styles"
        }
      }]
    ],
  };
};
