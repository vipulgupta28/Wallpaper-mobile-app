import { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const SLIDES = [
  {
    image:
      "https://ideogram.ai/assets/progressive-image/balanced/response/9SQrI7Z2QNGbQ5IIt4A0Zg",
    tag: "Discover",
    title: "Beautiful art for\nyour screen",
    sub: "Hand-picked wallpapers from talented creators around the world",
  },
  {
    image:
      "https://ideogram.ai/assets/progressive-image/balanced/response/qYbt_FrkRP2iq-WZ47IFxg",
    tag: "Explore",
    title: "Find your\nperfect aesthetic",
    sub: "Browse our curated library — from vivid art to calm minimalism",
  },
  {
    image:
      "https://ideogram.ai/assets/progressive-image/fast/response/b-wiG_vWR2u3bV5Y4hl1qA",
    tag: "Personalize",
    title: "Like it?\nMake it yours",
    sub: "Save favourites to your library and set them on your device in seconds",
  },
];

export default function Onboarding({ onComplete }: { onComplete: () => void }) {
  const insets = useSafeAreaInsets();
  const [index, setIndex] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  const isLast = index === SLIDES.length - 1;

  function goNext() {
    if (isLast) {
      onComplete();
    } else {
      const next = index + 1;
      scrollRef.current?.scrollTo({ x: next * width, animated: true });
      setIndex(next);
    }
  }

  function skip() {
    onComplete();
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" />

      {/* Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={StyleSheet.absoluteFill}
      >
        {SLIDES.map((slide, i) => (
          <View key={i} style={styles.slide}>
            <Image
              source={{ uri: slide.image }}
              style={StyleSheet.absoluteFill}
              resizeMode="cover"
            />
            {/* gradient overlay — two-layer approach */}
            <View style={styles.overlayTop} />
            <View style={styles.overlayBottom} />
          </View>
        ))}
      </ScrollView>

      {/* Content pinned to bottom */}
      <View
        style={[
          styles.content,
          { paddingBottom: insets.bottom + 24, paddingTop: insets.top + 12 },
        ]}
      >
        {/* Skip — top right */}
        {!isLast && (
          <Pressable style={styles.skipBtn} onPress={skip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
        )}

        {/* Spacer pushes text to bottom */}
        <View style={{ flex: 1 }} />

        {/* Slide text */}
        <View style={styles.textBlock}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{SLIDES[index].tag}</Text>
          </View>
          <Text style={styles.title}>{SLIDES[index].title}</Text>
          <Text style={styles.sub}>{SLIDES[index].sub}</Text>
        </View>

        {/* Dots */}
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>

        {/* CTA button */}
        <Pressable style={styles.btn} onPress={goNext}>
          <Text style={styles.btnText}>
            {isLast ? "Get Started" : "Next"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#000",
  },
  slide: {
    width,
    height,
  },
  overlayTop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  overlayBottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.55,
    backgroundColor: "rgba(0,0,0,0.62)",
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 28,
  },
  skipBtn: {
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  skipText: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  textBlock: {
    marginBottom: 28,
  },
  tag: {
    alignSelf: "flex-start",
    backgroundColor: "#FF6B00",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 14,
  },
  tagText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins_600SemiBold",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 34,
    fontFamily: "Poppins_700Bold",
    color: "#fff",
    lineHeight: 42,
    marginBottom: 12,
  },
  sub: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.75)",
    lineHeight: 23,
  },
  dots: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.35)",
  },
  dotActive: {
    width: 22,
    backgroundColor: "#FF6B00",
  },
  btn: {
    backgroundColor: "#FF6B00",
    borderRadius: 16,
    paddingVertical: 17,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
});
