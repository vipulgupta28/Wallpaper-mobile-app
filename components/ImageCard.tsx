import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Wallpaper } from "@/hooks/useWallpaper";

export default function ImageCard({
  wallpaper,
  onPress,
}: {
  wallpaper: Wallpaper;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image
          source={{ uri: wallpaper.url }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: 250,
  },
});
