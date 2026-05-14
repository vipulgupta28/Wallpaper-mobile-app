import SplitView from "@/components/SplitView";
import { useLibraryWallpapers } from "@/hooks/useWallpaper";

export default function LibraryScreen() {
  const wallpapers = useLibraryWallpapers();
  return <SplitView wallpapers={wallpapers} emptyMessage="Your library is empty" />;
}
