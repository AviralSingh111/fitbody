export default {
  expo: {
    name: "FitBody",
    slug: "fitbody",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/fitbodyIcon.png",
    userInterfaceStyle: "light",
    platforms: ["ios", "android"],
    splash: {
      image: "./assets/splash.jpeg",
    },
    assetBundlePatterns: [
      "**/*"
    ],
    fonts: [
      "./assets/fonts/poppins/Poppins-Regular.ttf",
      "./assets/fonts/poppins/Poppins-Bold.ttf", 
      "./assets/fonts/poppins/Poppins-Light.ttf",
      "./assets/fonts/leagueSpartan/LeagueSpartan-Bold.ttf",
      "./assets/fonts/leagueSpartan/LeagueSpartan-Light.ttf",
      "./assets/fonts/leagueSpartan/LeagueSpartan-Regular.ttf",
      "./assets/fonts/leagueSpartan/LeagueSpartan-Medium.ttf"
    ],
  "plugins": [
    "expo-font"
  ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.fitbody.app"
    },
    android: {
      package: "com.fitbody.app"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080",
      environment: process.env.EXPO_PUBLIC_ENVIRONMENT || "development",
      eas: {
        projectId: "ec06f266-47db-4762-b789-866797ea45e9"
      }
    }
  }
};