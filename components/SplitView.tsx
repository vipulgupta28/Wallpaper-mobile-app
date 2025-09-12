import { View, Image, StyleSheet, Dimensions } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { useState } from "react";
import { useWallpapers, Wallpaper } from "@/hooks/useWallpaper";
import ImageCard from "@/components/ImageCard";
import { DownloadPicture } from "@/components/BottomSheet";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function SplitView() {
  const wallpapers = useWallpapers();
  const [selectedWallpaper, setSelectedWallpaper] = useState<Wallpaper | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Split wallpapers into two columns
  const leftColumn: Wallpaper[] = [];
  const rightColumn: Wallpaper[] = [];

  wallpapers.forEach((w, index) => {
    if (index % 2 === 0) leftColumn.push(w);
    else rightColumn.push(w);
  });

  // Pick first 5 wallpapers for carousel
  const carouselData = wallpapers.slice(0, 5);

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ dark: "black", light: "white" }}
        headerImage={
          carouselData.length > 0 ? (
            <View>
              <Carousel
                width={width}
                height={250}
                autoPlay
                autoPlayInterval={3000}
                data={carouselData}
                onProgressChange={(_, absoluteProgress) =>
                  setActiveIndex(Math.round(absoluteProgress))
                }
                renderItem={({ item }) => (
                  <Image
                    style={styles.carouselImage}
                    source={{ uri: item.url }}
                    resizeMode="cover"
                  />
                )}
              />
              {/* Pagination dots */}
              <View style={styles.pagination}>
                {carouselData.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      i === activeIndex ? styles.activeDot : null,
                    ]}
                  />
                ))}
              </View>
            </View>
          ) : (
            <View />
          )
        }
      >
        <View style={styles.container}>
          <View style={styles.innerContainer}>
            {leftColumn.map((w, i) => (
              <ImageCard
                key={`left-${i}`}
                wallpaper={w}
                onPress={() => setSelectedWallpaper(w)}
              />
            ))}
          </View>
          <View style={styles.innerContainer}>
            {rightColumn.map((w, i) => (
              <ImageCard
                key={`right-${i}`}
                wallpaper={w}
                onPress={() => setSelectedWallpaper(w)}
              />
            ))}
          </View>
        </View>
      </ParallaxScrollView>

      {/* Bottom sheet for download */}
      {selectedWallpaper && (
        <DownloadPicture
          wallpaper={selectedWallpaper}
          onClose={() => setSelectedWallpaper(null)}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  carouselImage: {
    flex: 1,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  pagination: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.6)",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "white",
    width: 10,
    height: 10,
  },
  container: {
    flexDirection: "row",
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 4,
  },
});
