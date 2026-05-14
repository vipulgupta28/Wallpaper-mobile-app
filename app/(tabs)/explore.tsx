import { useRef, useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useWallpapers, Wallpaper } from "@/hooks/useWallpaper";
import ImageCard from "@/components/ImageCard";
import { useAppContext } from "@/contexts/AppContext";

const { width } = Dimensions.get("window");
const CAROUSEL_H = 230;

export default function Explore() {
  const { colors, openSheet } = useAppContext();
  const allWallpapers = useWallpapers();
  const [activeIdx, setActiveIdx] = useState(0);
  const [searchActive, setSearchActive] = useState(false);
  const [query, setQuery] = useState("");
  const scrollRef = useRef<ScrollView>(null);
  const inputRef  = useRef<TextInput>(null);

  const wallpapers = useMemo(() => {
    if (!query.trim()) return allWallpapers;
    const q = query.toLowerCase();
    return allWallpapers.filter((w) => w.name.toLowerCase().includes(q));
  }, [query, allWallpapers]);

  const featured = allWallpapers.slice(0, 6); // always use unfiltered for carousel
  const left  = wallpapers.filter((_, i) => i % 2 === 0);
  const right = wallpapers.filter((_, i) => i % 2 !== 0);

  // Auto-scroll carousel (only when search is inactive)
  useEffect(() => {
    if (searchActive) return;
    const t = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % featured.length;
        scrollRef.current?.scrollTo({ x: next * width, animated: true });
        return next;
      });
    }, 3400);
    return () => clearInterval(t);
  }, [featured.length, searchActive]);

  function openSearch() {
    setSearchActive(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  }

  function closeSearch() {
    setSearchActive(false);
    setQuery("");
    Keyboard.dismiss();
  }

  return (
    <View style={[styles.root, { backgroundColor: colors.bg }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        {searchActive ? (
          // Search bar
          <View style={[styles.searchBar, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            <Ionicons name="search-outline" size={18} color={colors.textMuted} style={{ marginRight: 6 }} />
            <TextInput
              ref={inputRef}
              value={query}
              onChangeText={setQuery}
              placeholder="Search wallpapers…"
              placeholderTextColor={colors.textMuted}
              style={[styles.searchInput, { color: colors.text }]}
              autoCorrect={false}
              returnKeyType="search"
            />
            <Pressable onPress={closeSearch}>
              <Ionicons name="close-circle" size={18} color={colors.textMuted} />
            </Pressable>
          </View>
        ) : (
          // Normal header
          <>
            <Text style={[styles.title, { color: colors.text }]}>Explore</Text>
            <Pressable style={[styles.searchBtn, { backgroundColor: colors.surface }]} onPress={openSearch}>
              <Ionicons name="search-outline" size={20} color={colors.text} />
            </Pressable>
          </>
        )}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Carousel — hidden when searching */}
        {!searchActive && (
          <View style={styles.carouselWrap}>
            <ScrollView
              ref={scrollRef}
              horizontal
              pagingEnabled
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              style={{ height: CAROUSEL_H }}
            >
              {featured.map((w, i) => (
                <Pressable key={i} onPress={() => openSheet(w)} style={{ width }}>
                  <Image source={{ uri: w.url }} style={styles.carouselImg} resizeMode="cover" />
                  <View style={styles.carouselOverlay}>
                    <View style={styles.carouselTag}>
                      <Text style={styles.carouselTagText}>Featured</Text>
                    </View>
                    <Text style={styles.carouselName}>{w.name}</Text>
                  </View>
                </Pressable>
              ))}
            </ScrollView>
            <View style={styles.dots}>
              {featured.map((_, i) => (
                <View key={i} style={[styles.dot, i === activeIdx && styles.dotActive]} />
              ))}
            </View>
          </View>
        )}

        {/* Section header */}
        <View style={styles.sectionRow}>
          {searchActive ? (
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {wallpapers.length === 0
                ? "No results"
                : `${wallpapers.length} result${wallpapers.length !== 1 ? "s" : ""}`}
            </Text>
          ) : (
            <>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>All Wallpapers</Text>
              <View style={[styles.badge, { backgroundColor: colors.orangeLight }]}>
                <Text style={[styles.badgeText, { color: colors.orange }]}>{allWallpapers.length}</Text>
              </View>
            </>
          )}
        </View>

        {/* Empty search state */}
        {searchActive && wallpapers.length === 0 && (
          <View style={styles.empty}>
            <Ionicons name="search-outline" size={48} color={colors.border} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              No wallpapers match "{query}"
            </Text>
          </View>
        )}

        {/* Masonry grid */}
        {wallpapers.length > 0 && (
          <View style={styles.grid}>
            <View style={styles.col}>
              {left.map((w, i) => (
                <ImageCard key={`l-${i}`} wallpaper={w} index={i * 2} onPress={() => openSheet(w)} />
              ))}
            </View>
            <View style={styles.col}>
              {right.map((w, i) => (
                <ImageCard key={`r-${i}`} wallpaper={w} index={i * 2 + 1} onPress={() => openSheet(w)} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 30,
    fontFamily: "Poppins_700Bold",
    letterSpacing: -0.5,
  },
  searchBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    padding: 0,
  },
  scroll: { paddingBottom: 120 },
  carouselWrap: { marginBottom: 24 },
  carouselImg: { width, height: CAROUSEL_H },
  carouselOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 20,
  },
  carouselTag: {
    alignSelf: "flex-start",
    backgroundColor: "#FF6B00",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginBottom: 6,
  },
  carouselTagText: {
    color: "#fff",
    fontSize: 11,
    fontFamily: "Poppins_600SemiBold",
  },
  carouselName: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    textShadowColor: "rgba(0,0,0,0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  dots: {
    position: "absolute",
    bottom: 12,
    right: 16,
    flexDirection: "row",
    gap: 5,
  },
  dot: {
    width: 6, height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  dotActive: { width: 18, backgroundColor: "#fff" },
  sectionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 8,
  },
  sectionTitle: { fontSize: 18, fontFamily: "Poppins_600SemiBold" },
  badge: { borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  badgeText: { fontSize: 12, fontFamily: "Poppins_600SemiBold" },
  grid: { flexDirection: "row", paddingHorizontal: 10 },
  col: { flex: 1, paddingHorizontal: 4 },
  empty: { alignItems: "center", paddingTop: 48, paddingHorizontal: 32 },
  emptyText: { fontSize: 15, fontFamily: "Poppins_500Medium", marginTop: 12, textAlign: "center" },
});
