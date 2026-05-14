import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import type { BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  Dimensions,
} from "react-native";
import React, { useCallback, useRef, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Wallpaper } from "@/hooks/useWallpaper";
import { useAppContext } from "@/contexts/AppContext";

const { height: SCREEN_H } = Dimensions.get("window");
// Image fills the sheet minus the info panel
const INFO_H  = 196;
const IMAGE_H = SCREEN_H - INFO_H - 28; // 28 = handle + indicator area

export const DownloadPicture = ({
  wallpaper,
  onClose,
}: {
  wallpaper: Wallpaper | null;
  onClose: () => void;
}) => {
  const { colors, isLiked, toggleLike } = useAppContext();
  const sheetRef = useRef<BottomSheet>(null);

  const handleChange = useCallback(
    (index: number) => {
      if (index === -1) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    sheetRef.current?.snapToIndex(0);
  }, [wallpaper]);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.6}
      />
    ),
    []
  );

  function handleDownload() {
    Alert.alert(
      "Set as Wallpaper",
      `Save "${wallpaper?.name}" to your gallery?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Save",
          style: "default",
          onPress: () => Alert.alert("Saved!", "Wallpaper added to your gallery."),
        },
      ]
    );
  }

  const liked = wallpaper ? isLiked(wallpaper.url) : false;

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={["100%"]}
      enablePanDownToClose
      onChange={handleChange}
      backdropComponent={renderBackdrop}
      handleIndicatorStyle={[styles.handle, { backgroundColor: colors.border }]}
      backgroundStyle={{ backgroundColor: colors.sheetBg }}
    >
      <BottomSheetView style={styles.sheet}>
        {wallpaper && (
          <>
            {/* Full-height image */}
            <View style={{ height: IMAGE_H }}>
              <Image
                source={{ uri: wallpaper.url }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
              />
              {/* Close X */}
              <Pressable
                style={[styles.closeBtn, { backgroundColor: "rgba(0,0,0,0.45)" }]}
                onPress={onClose}
              >
                <Ionicons name="close" size={18} color="#fff" />
              </Pressable>
            </View>

            {/* Info panel */}
            <View style={[styles.info, { backgroundColor: colors.sheetBg }]}>
              <View style={styles.nameRow}>
                <Text style={[styles.name, { color: colors.text }]} numberOfLines={1}>
                  {wallpaper.name}
                </Text>

                {/* Like / heart button */}
                <Pressable
                  style={[
                    styles.likeBtn,
                    { backgroundColor: liked ? colors.orange : colors.orangeLight },
                  ]}
                  onPress={() => toggleLike(wallpaper.url)}
                >
                  <Ionicons
                    name={liked ? "heart" : "heart-outline"}
                    size={20}
                    color={liked ? "#fff" : colors.orange}
                  />
                </Pressable>
              </View>

              {/* Download */}
              <Pressable style={styles.downloadBtn} onPress={handleDownload}>
                <Ionicons name="download-outline" size={20} color="#fff" />
                <Text style={styles.downloadText}>Set as Wallpaper</Text>
              </Pressable>

              <Pressable style={styles.dismissBtn} onPress={onClose}>
                <Text style={[styles.dismissText, { color: colors.textMuted }]}>Dismiss</Text>
              </Pressable>
            </View>
          </>
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  handle: {
    width: 36,
  },
  sheet: {
    flex: 1,
  },
  closeBtn: {
    position: "absolute",
    top: 14,
    right: 14,
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  name: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    flex: 1,
    marginRight: 12,
  },
  likeBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#FF6B00",
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  downloadText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
  },
  dismissBtn: {
    alignItems: "center",
    paddingVertical: 10,
  },
  dismissText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
});
