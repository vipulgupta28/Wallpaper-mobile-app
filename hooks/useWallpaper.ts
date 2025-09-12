
export interface Wallpaper{
    url:string,
    name:string,
}


interface FullWallpapaer extends Wallpaper{
    liked:boolean,
    suggested:boolean,
    library:boolean,
}


export function useSuggestedWallpapers() : FullWallpapaer[]{
    const wallpapers = useWallpapers();
    return wallpapers.filter(wallpaper => wallpaper.suggested);
}


export function useLikedWallpapers() : FullWallpapaer[]{
    const wallpapers = useWallpapers();
    return wallpapers.filter(wallpaper => wallpaper.liked);
}


export function useLibraryWallpapers() : FullWallpapaer[]{
    const wallpapers = useWallpapers();
    return wallpapers.filter(wallpaper => wallpaper.library);
}

export function useWallpapers(): FullWallpapaer[]{
    return[{
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/9SQrI7Z2QNGbQ5IIt4A0Zg",
        name:"Blue face",
        liked:true,
        suggested:true,
        library:false,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/9SQrI7Z2QNGbQ5IIt4A0Zghttps://ideogram.ai/assets/progressive-image/fast/response/rZCyDG4YQfCd_mkvzdxzBQ",
        name:"Turtle",
        liked:false,
        suggested:true,
        library:true,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/ktY07lAdTCeJBJHGCd0EAA",
        name:"Cat",
        liked:true,
        suggested:false,
        library:false,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/SxulHI6uTqOkTcUbGq3bmw",
        name:"Poster",
        liked:false,
        suggested:true,
        library:false,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/balanced/response/qYbt_FrkRP2iq-WZ47IFxg",
        name:"Tiger",
        liked:true,
        suggested:true,
        library:true,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/11jdCE42RvOpCp-hU3di7w",
        name:"Eagle",
        liked:false,
        suggested:true,
        library:true,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/vWwNOomNTOi9KvobBDB28A",
        name:"Women",
        liked:true,
        suggested:true,
        library:true,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/0JpWW8gqRM2yydvCOCkhbA",
        name:"Mask",
        liked:true,
        suggested:false,
        library:false,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/fJyq4BeiQHG2kFkBxbfoUA",
        name:"Snake",
        liked:true,
        suggested:true,
        library:false,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/b-wiG_vWR2u3bV5Y4hl1qA",
        name:"Flower",
        liked:true,
        suggested:true,
        library:true,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/f1xIpfEaRdeN8HSPzcsL2w",
        name:"Sunset",
        liked:true,
        suggested:true,
        library:false,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/7gRjB4NCRdiU7G_wyhOXFQ",
        name:"Snow Tree",
        liked:true,
        suggested:true,
        library:false,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/42B5qTE0QA-dFXe0-D2vSQ",
        name:"Fox",
        liked:true,
        suggested:true,
        library:false,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/VgCDc4MBR-mt2dof0Nyx6w",
        name:"LSD",
        liked:true,
        suggested:true,
        library:false,

    },

    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/17ludla6SsykQX-wuwvQZA",
        name:"Man and his car",
        liked:true,
        suggested:true,
        library:false,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/HXMj5yRtRnKLSjKzvFeU_A",
        name:"Fox on LSD",
        liked:true,
        suggested:true,
        library:false,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/kpnBqkVKRbyPrf49ErsSjQ",
        name:"Tulip",
        liked:true,
        suggested:true,
        library:false,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/Mf0gwBT8Rc-ytGvvlPfhBA",
        name:"Starship",
        liked:true,
        suggested:false,
        library:false,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/kgTc2r_DQQG1rAb_4Q9rgg",
        name:"Puppy",
        liked:false,
        suggested:true,
        library:false,

    },
    {
        url:"https://ideogram.ai/assets/progressive-image/fast/response/Sed9mGxoR9mWH0hPiMz8BA",
        name:"Stranger things 5",
        liked:true,
        suggested:true,
        library:false,

    },

]
}