export default {
  expo: {
    name: "FitBody",
    slug: "your-app-slug",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/fitbodyIcon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.jpeg",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    fonts: [
      "./assets/fonts/Poppins-Regular.ttf",
      "./assets/fonts/Poppins-Bold.ttf",
      "./assets/fonts/Poppins-Light.ttf",
    ],
  "plugins": [
    "expo-font"
  ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.yourcompany.yourapp"
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF"
      },
      package: "com.yourcompany.yourapp"
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080",
      environment: process.env.EXPO_PUBLIC_ENVIRONMENT || "development",
      eas: {
        projectId: "your-project-id-here"
      }
    }
  }
};