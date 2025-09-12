import SplitView from "@/components/SplitView";
import { useLibraryWallpapers } from "@/hooks/useWallpaper"
import { View, Text } from "react-native"

export default function LibraryScreen(){

    const wallpapers = useLibraryWallpapers();
    return(
        <SplitView wallpapers = {wallpapers} />
    )
}
 