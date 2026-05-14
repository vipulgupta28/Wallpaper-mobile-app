export const C = {
  orange:      "#FF6B00",
  orangeLight: "#FFF3EC",
  black:       "#111111",
  white:       "#FFFFFF",
  surface:     "#F7F7F7",
  border:      "#EBEBEB",
  muted:       "#999999",
  mutedDark:   "#666666",
} as const;

// Legacy export kept for template components (Collapsible, useThemeColor)
export const Colors = {
  light: { text: C.black, background: C.white, tint: C.orange, icon: C.muted, tabIconDefault: C.muted, tabIconSelected: C.orange },
  dark:  { text: C.white, background: C.black, tint: C.orange, icon: C.muted, tabIconDefault: C.muted, tabIconSelected: C.orange },
};
