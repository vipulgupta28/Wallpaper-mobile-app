# Panels — Wallpaper App

A clean, minimal wallpaper discovery app built with React Native and Expo. Browse curated wallpapers, save your favourites, and set them as your background — all wrapped in a polished black-and-orange UI with full dark mode support.

---

## Features

- **Curated feed** — Suggested, Liked, and Library tabs on the home screen
- **Explore** — full wallpaper grid with live search and a featured auto-scrolling carousel
- **Full-screen preview** — tap any wallpaper to open a bottom sheet that covers the entire screen
- **Like & save** — heart button persists likes across the app; Liked tab updates instantly
- **Dark / Light / System theme** — toggle in Account; every screen reacts immediately
- **Onboarding** — three-slide full-screen intro on first launch, skippable
- **Floating pill navigation** — custom bottom nav that sits above system gesture bars
- **Masonry grid** — staggered two-column card layout with variable card heights

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | [Expo](https://expo.dev) SDK 54 |
| Navigation | [Expo Router](https://expo.github.io/router) v6 (file-based) |
| Animations | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) v4 |
| Gestures | [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/) |
| Bottom sheet | [@gorhom/bottom-sheet](https://gorhom.dev/react-native-bottom-sheet/) v5 |
| Sub-tabs | [@react-navigation/material-top-tabs](https://reactnavigation.org/docs/material-top-tab-navigator/) |
| Fonts | [@expo-google-fonts/poppins](https://github.com/expo/google-fonts) |
| Icons | [@expo/vector-icons](https://icons.expo.fyi) (Ionicons) |
| State | React Context API |
| Language | TypeScript 5.9 |

---

## Project Structure

```
app/
  _layout.tsx          # Root layout — fonts, AppProvider, onboarding overlay
  (tabs)/
    _layout.tsx        # Floating pill tab bar + global bottom sheet portal
    index.tsx          # "For You" tab — Suggested / Liked / Library sub-tabs
    explore.tsx        # Explore tab — carousel, search, masonry grid
    account.tsx        # Account tab — theme switcher, stats, sign-in UI
  suggested.tsx
  liked.tsx
  library.tsx

components/
  Onboarding.tsx       # 3-slide full-screen onboarding
  BottomSheet.tsx      # Wallpaper preview sheet (full-screen, like button, download)
  SplitView.tsx        # Reusable masonry two-column grid
  ImageCard.tsx        # Single wallpaper card with liked indicator

contexts/
  AppContext.tsx        # Global state: theme, liked URLs, selected wallpaper for sheet

hooks/
  useWallpaper.ts      # Wallpaper data + filtered hooks (suggested, liked, library)

constants/
  Colors.ts            # Static colour tokens
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- [Expo Go](https://expo.dev/go) app on your phone, **or** an Android / iOS simulator

### Install

```bash
git clone https://github.com/your-username/panels.git
cd panels
npm install --legacy-peer-deps
```

### Run

```bash
npm start          # starts Metro bundler, scan QR with Expo Go
npm run android    # opens Android emulator
npm run ios        # opens iOS simulator (macOS only)
```

---

## How It Works

### Theme system

`AppContext` holds a `ThemeMode` (`"light"` | `"dark"` | `"system"`) and resolves it to a `ThemeColors` object. Every screen reads colours from `useAppContext().colors`, so switching the theme in Account re-renders the whole app instantly with no reload.

### Like system

Liked wallpaper URLs are stored in a `Set<string>` inside `AppContext`. `toggleLike(url)` adds or removes the URL; `useLikedWallpapers()` filters the full wallpaper list against this set so the Liked tab always stays in sync.

### Bottom sheet portal

The `DownloadPicture` sheet renders once at the `(tabs)/_layout.tsx` level — above the floating nav pill — with `zIndex: 100`. Any screen calls `openSheet(wallpaper)` from context and the sheet expands to 100% of the screen, covering the nav bar.

### Onboarding

On first launch an `absoluteFill` overlay renders the three intro slides on top of the entire app. It disappears when the user taps **Get Started** or **Skip**. Currently in-memory — wire it to `AsyncStorage` to persist the "seen" flag across restarts.

---

## Customising Wallpapers

Edit the array inside `useWallpapers()` in [hooks/useWallpaper.ts](hooks/useWallpaper.ts). Each entry accepts:

```ts
{
  url: string;        // direct image URL
  name: string;       // display name
  suggested: boolean; // appears in Suggested tab
  library: boolean;   // appears in Library tab
}
```

---

## Roadmap

- [ ] Persist liked wallpapers with `AsyncStorage`
- [ ] Persist onboarding "seen" flag across app restarts
- [ ] Actual wallpaper download / set-as-wallpaper via `expo-media-library`
- [ ] Google & Apple sign-in
- [ ] Remote wallpaper source (REST API or Supabase)
- [ ] Category / tag filtering in Explore

---

## License

MIT
