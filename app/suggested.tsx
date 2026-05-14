import SplitView from "@/components/SplitView";
import { useSuggestedWallpapers } from "@/hooks/useWallpaper";

export default function SuggestedScreen() {
  const wallpapers = useSuggestedWallpapers();
  return <SplitView wallpapers={wallpapers} emptyMessage="No suggestions yet" />;
}
