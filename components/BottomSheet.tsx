import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { View, Text, StyleSheet, Image } from "react-native";
import React, { useCallback, useRef, useEffect } from "react";
import { Wallpaper } from "@/hooks/useWallpaper";

export const DownloadPicture = ({
  wallpaper,
  onClose,
}: {
  wallpaper: Wallpaper | null;
  onClose: () => void;
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        onClose(); // Close when user swipes down
      }
    },
    [onClose]
  );

  // Open sheet when component mounts
  useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [wallpaper]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={0}
      snapPoints={["99%"]}
      enablePanDownToClose
      onChange={handleSheetChanges}
      handleComponent={null} // 👈 Removes the top drag handle
 
    >
      <BottomSheetView style={styles.contentContainer}>
        {wallpaper ? (
          <>
            <Image
              source={{ uri: wallpaper.url }}
              style={styles.wallpaperImage}
              resizeMode="cover"
            />
            <Text style={styles.sheetTitle}>Get Wallpaper</Text>
          </>
        ) : (
          <Text style={styles.sheetText}>No image selected</Text>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  wallpaperImage: {
    width: "100%",
    height: 550,
    borderRadius: 12,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    backgroundColor: "#000", // Black bar for contrast
    color: "white",
    padding: 10,
    width: "100%",
    textAlign: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  sheetText: {
    fontSize: 14,
    color: "#fff", // White text for red background
  },
});
