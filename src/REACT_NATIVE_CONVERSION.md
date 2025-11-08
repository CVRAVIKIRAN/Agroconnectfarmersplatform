# 📱 React Native Conversion Guide

## Overview
This document provides step-by-step instructions to convert AgroConnect Pro from React Web to React Native mobile application.

---

## 1. Project Setup

### Install React Native CLI
```bash
npx react-native@latest init AgroConnectProMobile --template react-native-template-typescript
cd AgroConnectProMobile
```

### Install Required Dependencies
```bash
# Navigation
npm install @react-navigation/native @react-navigation/bottom-tabs @react-navigation/stack
npm install react-native-screens react-native-safe-area-context

# UI Components
npm install react-native-vector-icons
npm install react-native-linear-gradient
npm install react-native-image-picker

# Animations
npm install react-native-reanimated
npm install react-native-gesture-handler

# Location
npm install react-native-geolocation-service
npm install @react-native-community/geolocation

# Storage
npm install @react-native-async-storage/async-storage

# Forms
npm install react-hook-form

# Others
npm install react-native-toast-message
npm install react-native-modal
```

---

## 2. Component Conversion Map

### Web → React Native Element Mapping

| Web (React) | React Native | Notes |
|-------------|--------------|-------|
| `<div>` | `<View>` | Container |
| `<span>`, `<p>`, `<h1>-<h6>` | `<Text>` | All text must be in Text |
| `<img>` | `<Image>` | Requires source prop |
| `<button>` | `<TouchableOpacity>` or `<Pressable>` | Touch interactions |
| `<input>` | `<TextInput>` | Form inputs |
| `<a>` | `<TouchableOpacity>` + navigation | Links |
| CSS classes | `StyleSheet.create({...})` | Inline or stylesheet |

### Example Conversion

**Before (Web)**:
```tsx
<div className="bg-green-500 p-4 rounded-lg">
  <h2 className="text-white text-xl">Hello</h2>
  <button onClick={handleClick}>Click Me</button>
</div>
```

**After (React Native)**:
```tsx
<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
  <TouchableOpacity onPress={handleClick} style={styles.button}>
    <Text style={styles.buttonText}>Click Me</Text>
  </TouchableOpacity>
</View>

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2E7D32',
    padding: 16,
    borderRadius: 8,
  },
  title: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#1B5E20',
  },
  buttonText: {
    color: 'white',
  },
});
```

---

## 3. Navigation Structure

### Install Navigation
```bash
npm install @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs
```

### Navigation Setup

**App.tsx** (Root Navigator):
```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './navigation/AuthNavigator';
import { FarmerNavigator } from './navigation/FarmerNavigator';
import { ConsumerNavigator } from './navigation/ConsumerNavigator';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        ) : user.role === 'farmer' ? (
          <Stack.Screen name="Farmer" component={FarmerNavigator} />
        ) : (
          <Stack.Screen name="Consumer" component={ConsumerNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

**FarmerNavigator.tsx** (Bottom Tabs):
```tsx
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();

export function FarmerNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#gray',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={FarmerHome}
        options={{
          tabBarIcon: ({ color }) => <Icon name="home" size={24} color={color} />
        }}
      />
      <Tab.Screen 
        name="Upload" 
        component={UploadProduct}
        options={{
          tabBarIcon: ({ color }) => <Icon name="upload" size={24} color={color} />
        }}
      />
      {/* More tabs... */}
    </Tab.Navigator>
  );
}
```

---

## 4. AsyncStorage (Replace LocalStorage)

### Install
```bash
npm install @react-native-async-storage/async-storage
```

### Usage

**Before (Web)**:
```typescript
localStorage.setItem('user', JSON.stringify(user));
const user = JSON.parse(localStorage.getItem('user'));
```

**After (React Native)**:
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Save
await AsyncStorage.setItem('user', JSON.stringify(user));

// Retrieve
const user = JSON.parse(await AsyncStorage.getItem('user'));

// Remove
await AsyncStorage.removeItem('user');
```

### Helper Functions
```typescript
// utils/storage.ts
export const storage = {
  async set(key: string, value: any) {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  },
  
  async get(key: string) {
    const value = await AsyncStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  
  async remove(key: string) {
    await AsyncStorage.removeItem(key);
  },
};
```

---

## 5. Location Services

### Install
```bash
npm install react-native-geolocation-service
npm install @react-native-community/geolocation
```

### iOS Setup (ios/Podfile)
```ruby
pod 'react-native-geolocation', path: '../node_modules/@react-native-community/geolocation'
```

### Android Setup (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### Usage
```typescript
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

async function requestLocationPermission() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
}

async function getCurrentLocation() {
  const hasPermission = await requestLocationPermission();
  
  if (hasPermission) {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }
}
```

---

## 6. Image Picker

### Install
```bash
npm install react-native-image-picker
```

### iOS Setup (Info.plist)
```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>Allow access to select photos</string>
<key>NSCameraUsageDescription</key>
<string>Allow access to take photos</string>
```

### Android Setup (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

### Usage
```typescript
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';

const handleImagePicker = () => {
  launchImageLibrary(
    {
      mediaType: 'photo',
      maxWidth: 1024,
      maxHeight: 1024,
      quality: 0.8,
      selectionLimit: 5,
    },
    (response) => {
      if (response.assets) {
        const images = response.assets.map(asset => asset.uri);
        setImages(images);
      }
    }
  );
};
```

---

## 7. Styling Conversion

### Tailwind → StyleSheet

**Common Tailwind Classes**:

| Tailwind | React Native Style |
|----------|-------------------|
| `flex` | `display: 'flex'` |
| `flex-row` | `flexDirection: 'row'` |
| `flex-col` | `flexDirection: 'column'` |
| `justify-center` | `justifyContent: 'center'` |
| `items-center` | `alignItems: 'center'` |
| `p-4` | `padding: 16` |
| `m-2` | `margin: 8` |
| `bg-green-500` | `backgroundColor: '#2E7D32'` |
| `text-white` | `color: 'white'` |
| `text-xl` | `fontSize: 20` |
| `font-bold` | `fontWeight: 'bold'` |
| `rounded-lg` | `borderRadius: 8` |
| `shadow-lg` | `shadowColor, shadowOffset, shadowOpacity, shadowRadius` |

### Shadow Example
```typescript
// iOS + Android compatible shadow
const styles = StyleSheet.create({
  card: {
    // iOS shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android shadow
    elevation: 5,
  },
});
```

---

## 8. Component Conversions

### Button Component

**Web (Tailwind)**:
```tsx
<button className="bg-green-600 text-white px-4 py-2 rounded-lg">
  Click Me
</button>
```

**React Native**:
```tsx
<TouchableOpacity style={styles.button} onPress={handlePress}>
  <Text style={styles.buttonText}>Click Me</Text>
</TouchableOpacity>

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});
```

### Input Component

**Web**:
```tsx
<input 
  type="text" 
  placeholder="Enter name"
  className="border p-2 rounded"
/>
```

**React Native**:
```tsx
<TextInput
  placeholder="Enter name"
  style={styles.input}
  placeholderTextColor="#999"
/>

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 8,
    borderRadius: 4,
  },
});
```

### Card Component

**Web**:
```tsx
<div className="bg-white shadow rounded-lg p-4">
  <h3>Title</h3>
  <p>Content</p>
</div>
```

**React Native**:
```tsx
<View style={styles.card}>
  <Text style={styles.title}>Title</Text>
  <Text style={styles.content}>Content</Text>
</View>

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
    color: '#666',
  },
});
```

---

## 9. File Structure

```
AgroConnectProMobile/
├── src/
│   ├── navigation/
│   │   ├── AuthNavigator.tsx
│   │   ├── FarmerNavigator.tsx
│   │   ├── ConsumerNavigator.tsx
│   │   └── AdminNavigator.tsx
│   ├── screens/
│   │   ├── auth/
│   │   ├── farmer/
│   │   ├── consumer/
│   │   └── admin/
│   ├── components/
│   │   ├── common/
│   │   └── ui/
│   ├── utils/
│   │   ├── storage.ts
│   │   ├── location.ts
│   │   └── api.ts
│   ├── constants/
│   │   └── categories.ts
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── colors.ts
├── android/
├── ios/
└── App.tsx
```

---

## 10. Platform-Specific Code

### Detect Platform
```typescript
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },
});

// Or use Platform.select
const padding = Platform.select({
  ios: 20,
  android: 0,
  default: 0,
});
```

---

## 11. Testing

### Run on Devices

**iOS**:
```bash
npx react-native run-ios
# or specific device
npx react-native run-ios --simulator="iPhone 14 Pro"
```

**Android**:
```bash
npx react-native run-android
# or specific device
adb devices
npx react-native run-android --deviceId=<device-id>
```

---

## 12. Build for Production

### Android

```bash
cd android
./gradlew assembleRelease

# APK location:
# android/app/build/outputs/apk/release/app-release.apk

# For Play Store (AAB):
./gradlew bundleRelease
# android/app/build/outputs/bundle/release/app-release.aab
```

### iOS

1. Open `ios/AgroConnectProMobile.xcworkspace` in Xcode
2. Select "Generic iOS Device"
3. Product → Archive
4. Distribute App → App Store Connect

---

## 13. Key Differences to Remember

| Aspect | Web | React Native |
|--------|-----|--------------|
| **Styling** | CSS/Tailwind | StyleSheet |
| **Navigation** | React Router | React Navigation |
| **Storage** | localStorage | AsyncStorage |
| **Images** | `<img src>` | `<Image source>` |
| **Scrolling** | Auto | `<ScrollView>` or `<FlatList>` |
| **Text** | Direct in div | Must use `<Text>` |
| **Touch** | onClick | onPress |
| **Input** | `<input>` | `<TextInput>` |

---

## 14. Performance Optimization

### Use FlatList for Long Lists
```tsx
import { FlatList } from 'react-native';

<FlatList
  data={products}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ProductCard product={item} />}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={5}
/>
```

### Optimize Images
```tsx
import FastImage from 'react-native-fast-image';

<FastImage
  source={{ uri: imageUrl }}
  style={styles.image}
  resizeMode={FastImage.resizeMode.cover}
/>
```

---

## 15. Deployment Checklist

### Before Release

- [ ] Update app version in `package.json`
- [ ] Update version in `android/app/build.gradle`
- [ ] Update version in `ios/Info.plist`
- [ ] Add app icons for all sizes
- [ ] Add splash screens
- [ ] Configure deep linking
- [ ] Set up push notifications
- [ ] Add analytics
- [ ] Test on multiple devices
- [ ] Optimize bundle size
- [ ] Enable Proguard (Android)
- [ ] Generate release keys
- [ ] Set up crash reporting

---

## Summary

This guide covers the complete conversion from **React Web** to **React Native**. The current web codebase is structured to make this conversion straightforward:

1. ✅ Component-based architecture
2. ✅ Separated business logic
3. ✅ Type-safe with TypeScript
4. ✅ Modular navigation structure
5. ✅ Ready for AsyncStorage migration
6. ✅ Mobile-first design patterns

**Estimated Conversion Time**: 2-3 weeks with a React Native developer

**Key Advantage**: 90% of business logic can be reused, only UI layer needs conversion!
