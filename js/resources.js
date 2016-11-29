game.resources = [

    /* Graphics.
     * @example
     * { name: "example", type:"image", src: "data/img/example.png" },
     */
    { name: "tileset",         type:"image",   src: "http://melonjs.github.io/melonJS/examples/platformer/data/img/tileset.png" },
    { name: "background",      type:"image",   src: "http://melonjs.github.io/melonJS/examples/platformer/data/img/background.png" },
    { name: "clouds",          type:"image",   src: "http://melonjs.github.io/melonJS/examples/platformer/data/img/clouds.png" },

    /* Maps.
     * @example
     * { name: "example01", type: "tmx", src: "data/map/example01.tmx" },
     * { name: "example01", type: "tmx", src: "data/map/example01.json" },
     */
    { name: "map1",            type: "tmx",    src: "http://melonjs.github.io/melonJS/examples/platformer/data/map/map1.tmx" },
    { name: "map2",            type: "tmx",    src: "http://melonjs.github.io/melonJS/examples/platformer/data/map/map2.json" },


    /* Tilesets.
     * @example
     * { name: "example01", type: "tsx", src: "data/map/example01.tsx" },
     * { name: "example01", type: "tsx", src: "data/map/example01.json" },
     */
    { name: "tileset",         type: "tsx",    src: "http://melonjs.github.io/melonJS/examples/platformer/data/map/tileset.json" },


    /* Background music.
     * @example
     * { name: "example_bgm", type: "audio", src: "data/bgm/" },
     */
    { name: "dst-gameforest",  type: "audio",  stream: true, src: "http://melonjs.github.io/melonJS/examples/platformer/data/bgm/" },

    /* Sound effects.
     * @example
     * { name: "example_sfx", type: "audio", src: "data/sfx/" }
     */
    { name: "cling",           type: "audio",  src: "http://melonjs.github.io/melonJS/examples/platformer/data/sfx/" },
    { name: "die",             type: "audio",  src: "http://melonjs.github.io/melonJS/examples/platformer/data/sfx/" },
    { name: "enemykill",       type: "audio",  src: "http://melonjs.github.io/melonJS/examples/platformer/data/sfx/" },
    { name: "jump",            type: "audio",  src: "http://melonjs.github.io/melonJS/examples/platformer/data/sfx/" },


    /* Atlases
     * @example
     * { name: "example_tps", type: "json", src: "data/img/example_tps.json" },
     */
    // texturePacker
    { name: "texture",         type: "json",   src: "http://melonjs.github.io/melonJS/examples/platformer/data/img/texture.json" },
    { name: "texture",         type: "image",  src: "http://melonjs.github.io/melonJS/examples/platformer/data/img/texture.png" },

    /* Bitmap Font
    * @example
    * { name: "example_fnt", type: "image", src: "data/img/example_fnt.png" },
    * { name: "example_fnt", type: "binary", src: "data/img/example_fnt.fnt" },
    */
    { name: "PressStart2P", type:"image", src: "http://melonjs.github.io/melonJS/examples/platformer/data/fnt/PressStart2P.png" },
    { name: "PressStart2P", type:"binary", src: "http://melonjs.github.io/melonJS/examples/platformer/data/fnt/PressStart2P.fnt"}
];
