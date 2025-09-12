import SplitView from "@/components/SplitView";
import { useSuggestedWallpapers } from "@/hooks/useWallpaper"
import { View, Text } from "react-native"

export default function SuggestedyScreen(){

    const wallpapers = useSuggestedWallpapers();
    return(
        <SplitView />
    )
}