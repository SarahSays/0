# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with this starter from creators of NativeWind: [`npx rn-new@latest`](https://rn.new/).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Features

- **Cross-platform**: Supports iOS, Android, and Web
- **File-based routing**: Uses Expo Router for navigation
- **Drawer navigation**: Main navigation with drawer menu
- **Tab navigation**: Nested tab navigation within drawer
- **State management**: Zustand for global state
- **Firebase integration**: Ready for Firebase services
- **TypeScript**: Full TypeScript support
- **Code quality**: ESLint and Prettier configured

## Project Structure

```
app/                    # Main app directory (file-based routing)
├── _layout.tsx                # Root layout with authentication routing
├── landing.tsx                # Authentication landing screen
├── enter-email.tsx            # Email entry screen
├── enter-code.tsx             # Email verification code entry
├── turn-on-notifications.tsx  # Notification permissions screen
├── pick-username.tsx          # Username selection screen
├── +html.tsx                  # HTML route
├── +not-found.tsx             # 404 page
├── modal.tsx           # Modal screen
└── (drawer)/           # Drawer navigation group (protected)
    ├── _layout.tsx     # Drawer layout
    ├── index.tsx       # Home screen
    └── (tabs)/         # Tab navigation group
        ├── _layout.tsx # Tab layout
        ├── index.tsx   # Tab One
        └── two.tsx     # Tab Two

components/             # Reusable components
store/                  # Zustand state management
utils/                  # Utility functions (Firebase config)
assets/                 # Static assets
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with your Firebase configuration:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_DATABASE_URL=your_database_url
EXPO_PUBLIC_PROJECT_ID=your_project_id
EXPO_PUBLIC_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_APP_ID=your_app_id
EXPO_PUBLIC_MEASUREMENT_ID=your_measurement_id
```

### App Configuration

The app is configured in `app.json` with:
- **Platforms**: iOS, Android, Web
- **Orientation**: Portrait only
- **Navigation**: File-based routing with typed routes
- **Icons**: Custom app icons and splash screen
- **EAS**: Build configuration with development, preview, and production profiles

### Build Configuration

EAS Build is configured in `eas.json` with three profiles:
- **development**: Internal distribution with dev client
- **preview**: Internal distribution for testing
- **production**: App Store/Play Store distribution with auto-increment

## Development Scripts

- `npm start` - Start development server with dev client
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run web` - Start web development server
- `npm run build:dev` - Build development version
- `npm run build:preview` - Build preview version
- `npm run build:prod` - Build production version
- `npm run prebuild` - Generate native code
- `npm run lint` - Run ESLint and Prettier checks
- `npm run format` - Fix ESLint issues and format code

## Navigation Structure

The app uses a nested navigation structure:
- **Stack Navigation**: Root level with drawer and modal
- **Drawer Navigation**: Main navigation with Home and Tabs sections
- **Tab Navigation**: Two tabs within the drawer

## Authentication Flow

Authentication is required to access the app. New users go through a multi-step signup flow:

1. **Landing Screen** (`landing.tsx`): Terms agreement and "Continue with Email" button
2. **Enter Email** (`enter-email.tsx`): Email input with validation and security link
3. **Enter Code** (`enter-code.tsx`): Email verification code entry
4. **Turn on Notifications** (`turn-on-notifications.tsx`): Push notification permissions
5. **Pick Username** (`pick-username.tsx`): Username selection and account creation

After authentication, users access the main app with drawer navigation and tabs. The authentication state is managed with Firebase Auth.

## Code Quality

- **ESLint**: Configured with Expo rules and Prettier integration
- **Prettier**: Code formatting with custom configuration
- **TypeScript**: Strict type checking enabled

## Building for Production

1. Configure EAS Build:
   ```bash
   eas build:configure
   ```

2. Build for production:
   ```bash
   npm run build:prod
   ```

3. Submit to stores:
   ```bash
   eas submit --platform ios
   eas submit --platform android
   ```

## Learn More

- [Expo Documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- [React Navigation](https://reactnavigation.org/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Zustand](https://zustand-demo.pmnd.rs/)
