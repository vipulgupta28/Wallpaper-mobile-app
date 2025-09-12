import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { Alert } from "react-native";

export async function saveToGallery(url: string) {
  try {
    await CameraRoll.saveAsset(url, { type: "photo" }); // 👈 updated method
    Alert.alert("✅ Saved", "Wallpaper added to your gallery!");
  } catch (err) {
    console.error(err);
    Alert.alert("❌ Error", "Failed to save wallpaper");
  }
}
