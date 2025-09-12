import { View, Image, StyleSheet } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useWallpapers, Wallpaper } from "@/hooks/useWallpaper";
import ImageCard from "@/components/ImageCard";
import { DownloadPicture } from "@/components/BottomSheet";

export default function Explore() {
  const wallpapers = useWallpapers();
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);

  // Split wallpapers into two columns
  const leftColumn: Wallpaper[] = [];
  const rightColumn: Wallpaper[] = [];

  wallpapers.forEach((w, index) => {
    if (index % 2 === 0) leftColumn.push(w);
    else rightColumn.push(w);
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ dark: "black", light: "white" }}
        headerImage={
          wallpapers[0] ? (
            <Image
              style={{ flex: 1 , borderRadius:20,}}
              source={{ uri: wallpapers[0].url }}
              resizeMode="cover"
            />
          ) : (
            <View />
          )
        }
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            {leftColumn.map((w, i) => (
              <ImageCard key={`left-${i}`} wallpaper={w} onPress={() => setSelectedWallpaper(w)} />
            ))}
          </View>
          <View style={styles.innerContainer}>
            {rightColumn.map((w, i) => (
              <ImageCard key={`right-${i}`} wallpaper={w} onPress={() => setSelectedWallpaper(w)} />
            ))}
          </View>
        </View>
      </ParallaxScrollView>

      {/* Always render the sheet, but pass selected wallpaper */}
      {selectedWallpaper && (
        <DownloadPicture
          wallpaper={selectedWallpaper}
          onClose={() => setSelectedWallpaper(null)}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 4,
  },
});
