import SplitView from "@/components/SplitView";
import { useLikedWallpapers } from "@/hooks/useWallpaper"
import { View, Text } from "react-native"

export default function LikeScreen(){

    const wallpapers = useLikedWallpapers();
    return(
        <SplitView />
    )
}