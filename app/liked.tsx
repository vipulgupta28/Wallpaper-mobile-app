import SplitView from "@/components/SplitView";
import { useLikedWallpapers } from "@/hooks/useWallpaper";

export default function LikeScreen() {
  const wallpapers = useLikedWallpapers();
  return <SplitView wallpapers={wallpapers} emptyMessage="No liked wallpapers" />;
}
