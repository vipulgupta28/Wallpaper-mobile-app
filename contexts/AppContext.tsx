import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import { useColorScheme } from "react-native";

// ─── Theme ────────────────────────────────────────────────────────────────────
export type ThemeMode = "light" | "dark" | "system";

export interface ThemeColors {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  orange: string;
  orangeLight: string;
  navBg: string;
  sheetBg: string;
  cardBg: string;
  // always-constant convenience values
  white: string;
  black: string;
}

const LIGHT: ThemeColors = {
  bg:          "#FFFFFF",
  surface:     "#F7F7F7",
  text:        "#111111",
  textMuted:   "#999999",
  border:      "#EBEBEB",
  orange:      "#FF6B00",
  orangeLight: "#FFF3EC",
  navBg:       "#FFFFFF",
  sheetBg:     "#FFFFFF",
  cardBg:      "#F0F0F0",
  white:       "#FFFFFF",
  black:       "#111111",
};

const DARK: ThemeColors = {
  bg:          "#0D0D0D",
  surface:     "#1C1C1C",
  text:        "#F0F0F0",
  textMuted:   "#888888",
  border:      "#2D2D2D",
  orange:      "#FF6B00",
  orangeLight: "#2A1500",
  navBg:       "#1C1C1C",
  sheetBg:     "#141414",
  cardBg:      "#1C1C1C",
  white:       "#FFFFFF",
  black:       "#111111",
};

// ─── Shared types ─────────────────────────────────────────────────────────────
export interface SheetWallpaper {
  url: string;
  name: string;
}

// ─── Context ──────────────────────────────────────────────────────────────────
interface AppContextType {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  colors: ThemeColors;
  isDark: boolean;

  likedUrls: Set<string>;
  toggleLike: (url: string) => void;
  isLiked: (url: string) => boolean;

  sheetWallpaper: SheetWallpaper | null;
  openSheet: (w: SheetWallpaper) => void;
  closeSheet: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeMode>("system");
  const [likedUrls, setLikedUrls] = useState<Set<string>>(new Set());
  const [sheetWallpaper, setSheetWallpaper] = useState<SheetWallpaper | null>(null);

  const isDark = useMemo(
    () => theme === "dark" || (theme === "system" && systemScheme === "dark"),
    [theme, systemScheme]
  );

  const colors = isDark ? DARK : LIGHT;

  function toggleLike(url: string) {
    setLikedUrls((prev) => {
      const next = new Set(prev);
      if (next.has(url)) next.delete(url);
      else next.add(url);
      return next;
    });
  }

  function isLiked(url: string) {
    return likedUrls.has(url);
  }

  return (
    <AppContext.Provider
      value={{
        theme, setTheme, colors, isDark,
        likedUrls, toggleLike, isLiked,
        sheetWallpaper, openSheet: setSheetWallpaper, closeSheet: () => setSheetWallpaper(null),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be inside <AppProvider>");
  return ctx;
}
