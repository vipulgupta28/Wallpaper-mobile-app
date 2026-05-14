import { useAppContext } from "@/contexts/AppContext";

export interface Wallpaper {
  url: string;
  name: string;
}

interface FullWallpaper extends Wallpaper {
  suggested: boolean;
  library: boolean;
}

// useLikedWallpapers now driven by the AppContext liked set (starts empty)
export function useLikedWallpapers(): Wallpaper[] {
  const { likedUrls } = useAppContext();
  return useWallpapers().filter((w) => likedUrls.has(w.url));
}

export function useSuggestedWallpapers(): FullWallpaper[] {
  return useWallpapers().filter((w) => w.suggested);
}

export function useLibraryWallpapers(): FullWallpaper[] {
  return useWallpapers().filter((w) => w.library);
}

export function useWallpapers(): FullWallpaper[] {
  return [
    { url: "https://ideogram.ai/assets/progressive-image/balanced/response/9SQrI7Z2QNGbQ5IIt4A0Zg", name: "Blue Face",          suggested: true,  library: false },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/rZCyDG4YQfCd_mkvzdxzBQ",     name: "Turtle",           suggested: true,  library: true  },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/ktY07lAdTCeJBJHGCd0EAA",      name: "Cat",              suggested: false, library: false },
    { url: "https://ideogram.ai/assets/progressive-image/balanced/response/SxulHI6uTqOkTcUbGq3bmw",  name: "Poster",           suggested: true,  library: false },
    { url: "https://ideogram.ai/assets/progressive-image/balanced/response/qYbt_FrkRP2iq-WZ47IFxg",  name: "Tiger",            suggested: true,  library: true  },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/11jdCE42RvOpCp-hU3di7w",     name: "Eagle",            suggested: true,  library: true  },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/vWwNOomNTOi9KvobBDB28A",      name: "Women",            suggested: true,  library: true  },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/0JpWW8gqRM2yydvCOCkhbA",      name: "Mask",             suggested: false, library: false },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/fJyq4BeiQHG2kFkBxbfoUA",      name: "Snake",            suggested: true,  library: false },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/b-wiG_vWR2u3bV5Y4hl1qA",      name: "Flower",           suggested: true,  library: true  },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/f1xIpfEaRdeN8HSPzcsL2w",      name: "Sunset",           suggested: true,  library: false },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/7gRjB4NCRdiU7G_wyhOXFQ",      name: "Snow Tree",        suggested: true,  library: false },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/42B5qTE0QA-dFXe0-D2vSQ",      name: "Fox",              suggested: true,  library: false },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/VgCDc4MBR-mt2dof0Nyx6w",      name: "LSD",              suggested: true,  library: false },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/17ludla6SsykQX-wuwvQZA",      name: "Man and His Car",  suggested: true,  library: false },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/HXMj5yRtRnKLSjKzvFeU_A",      name: "Fox on LSD",       suggested: true,  library: false },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/kpnBqkVKRbyPrf49ErsSjQ",      name: "Tulip",            suggested: true,  library: false },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/Mf0gwBT8Rc-ytGvvlPfhBA",      name: "Starship",         suggested: false, library: false },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/kgTc2r_DQQG1rAb_4Q9rgg",      name: "Puppy",            suggested: true,  library: false },
    { url: "https://ideogram.ai/assets/progressive-image/fast/response/Sed9mGxoR9mWH0hPiMz8BA",      name: "Stranger Things",  suggested: true,  library: false },
  ];
}
