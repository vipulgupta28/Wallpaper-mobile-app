import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Wallpaper } from "@/hooks/useWallpaper";
import { useAppContext } from "@/contexts/AppContext";

const HEIGHTS = [230, 190, 270, 210, 255, 195, 240, 280, 200, 250];
const cardH   = (i: number) => HEIGHTS[i % HEIGHTS.length];

export default function ImageCard({
  wallpaper,
  index = 0,
  onPress,
}: {
  wallpaper: Wallpaper;
  index?: number;
  onPress?: () => void;
}) {
  const { colors, isLiked } = useAppContext();
  const liked = isLiked(wallpaper.url);

  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, { height: cardH(index), backgroundColor: colors.cardBg }]}
    >
      <Image source={{ uri: wallpaper.url }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={styles.name} numberOfLines={1}>{wallpaper.name}</Text>
      </View>
      {liked && (
        <View style={[styles.likedDot, { backgroundColor: colors.orange }]} />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    borderRadius: 16,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  overlay: {
    position: "absolute",
    bottom: 0, left: 0, right: 0,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "rgba(0,0,0,0.38)",
  },
  name: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
  likedDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#fff",
  },
});
