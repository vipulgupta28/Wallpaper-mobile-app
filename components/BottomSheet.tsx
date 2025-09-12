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

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose(); // Close when user swipes down
    }
  }, [onClose]);

  // Open sheet when component mounts
  useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [wallpaper]);

  return (
    <BottomSheet
  ref={bottomSheetRef}
  index={0}              // 👈 ensures it starts at 95% height
  snapPoints={["95%"]}
  enablePanDownToClose
  onChange={handleSheetChanges}
  handleIndicatorStyle={{ height: 4, backgroundColor: "#ccc" }}
>

      <BottomSheetView style={styles.contentContainer}>
        {wallpaper ? (
          <>
            <Image
              source={{ uri: wallpaper.url }}
              style={{ width: "100%", height: 650, borderRadius: 12 }}
              resizeMode="cover"
            />
            <Text style={styles.sheetTitle}>Get Wallpaper</Text>
           
          </>
        ) : (
          <Text>No image selected</Text>
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
  sheetTitle: {
    fontSize: 18,
    fontWeight: "600",
    backgroundColor:"black",
    color:"white",
    padding:10,
    width:"100%",
    textAlign:"center",
    borderRadius:10,
    marginVertical: 10,
  },
  sheetText: {
    fontSize: 14,
    color: "#555",
  },
});
