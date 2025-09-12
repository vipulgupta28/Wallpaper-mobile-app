import { DownloadPicture } from "@/components/BottomSheet";
import { useState } from "react";
import { View, Text, Button } from "react-native";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { SafeAreaView } from "react-native-safe-area-context";

export default function account() {
    const [pictureOpen, setPictureOpen] = useState(false);
  
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
    
          <Button
            onPress={() => {
              setPictureOpen(true);
            }}
            title="Open Bottom Sheet"
          />
          {pictureOpen && <DownloadPicture onClose={()=>setPictureOpen(false)} />}
        </BottomSheetModalProvider>
      </SafeAreaView>
    );
  }