import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.moju.mojuapp',
  appName: 'mo&ju',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchShowDuration: 800,
      backgroundColor: '#f8fafc',
      showSpinner: false,
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#f8fafc',
      overlaysWebView: false,
    },
  },
}

export default config
