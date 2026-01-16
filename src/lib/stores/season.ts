import { writable } from 'svelte/store';

export interface Season {
    id: string;
    name_ro: string;
    name_en: string;
    logo: string;
}

export const seasons: Season[] = [
    {
        id: "velocityvortex",
        name_ro: "VELOCITY VORTEX",
        name_en: "VELOCITY VORTEX",
        logo: "src/assets/ftc-seasons/velocityvortex.png",
    },
    {
        id: "relicrecovery",
        name_ro: "RELIC RECOVERY",
        name_en: "RELIC RECOVERY",
        logo: "src/assets/ftc-seasons/relicrecovery.png",
    },
    {
        id: "roverruckus",
        name_ro: "ROVER RUCKUS",
        name_en: "ROVER RUCKUS",
        logo: "src/assets/ftc-seasons/roverruckus.png",
    },
    {
        id: "skystone",
        name_ro: "SKYSTONE",
        name_en: "SKYSTONE",
        logo: "src/assets/ftc-seasons/skystone.png",
    },
    {
        id: "ultimategoal",
        name_ro: "ULTIMATE GOAL",
        name_en: "ULTIMATE GOAL",
        logo: "src/assets/ftc-seasons/ultimategoal.png",
    },
    {
        id: "freightfrenzy",
        name_ro: "FREIGHT FRENZY",
        name_en: "FREIGHT FRENZY",
        logo: "src/assets/ftc-seasons/freightfrenzy.png",
    },
    {
        id: "powerplay",
        name_ro: "POWER PLAY",
        name_en: "POWER PLAY",
        logo: "src/assets/ftc-seasons/powerplay.png",
    },
    {
        id: "centerstage",
        name_ro: "CENTER STAGE",
        name_en: "CENTER STAGE",
        logo: "src/assets/ftc-seasons/centerstage.png",
    },
    {
        id: "intothedeep",
        name_ro: "INTO THE DEEP",
        name_en: "INTO THE DEEP",
        logo: "src/assets/ftc-seasons/intothedeep.png",
    },
    {
        id: "decode",
        name_ro: "DECODE",
        name_en: "DECODE",
        logo: "src/assets/ftc-seasons/decode.png",
    },
];

// Default to INTO THE DEEP (index 8)
export const selectedSeasonIndex = writable(8);
export const menuStartIndex = writable(0);
