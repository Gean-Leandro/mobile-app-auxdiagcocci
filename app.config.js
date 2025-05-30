import 'dotenv/config';

const config = require('./development.config.js');


module.exports = {
  expo: {
    owner: "geancarlossl",
    name: "Guia Ilustrativo da Coccidiose Aviária",
    slug: "mobile-coccidiose-app",
    version: "1.0.0",
    icon: "./assets/images/icon.png",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "cover",      
      backgroundColor: "#ffffff"   
    },
    android: {
      package: "com.geancarlos.mobilecoccidioseapp",
    },
    updates: {
      url: "https://u.expo.dev/cfb82513-4521-4db9-b099-fc1b8dcca0b9"
    },
    runtimeVersion: {
      policy: "appVersion"
    },
    ios: {
      bundleIdentifier: "com.geancarlos.mobilecoccidioseapp",
    },
    extra: {
      API_KEY: process.env.API_KEY,
      AUTH_DOMAIN: process.env.AUTH_DOMAIN,
      DATABASE_URL: process.env.DATABASE_URL,
      PROJECT_ID: process.env.PROJECT_ID,
      STORAGE_BUCKET: process.env.STORAGE_BUCKET,
      MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
      APP_ID: process.env.APP_ID,
      MEASUREMENT_ID: process.env.MEASUREMENT_ID,
      eas: {
        projectId: "cfb82513-4521-4db9-b099-fc1b8dcca0b9"
      },
    }
  },
};