import {Project, Technologie} from "@/global/global";
/*Languages Icons*/
import HTMLIcon from "/public/static/technologies_icons/HTML.png";
import CSSIcon from "/public/static/technologies_icons/CSS.png";
import JSIcon from "/public/static/technologies_icons/JS.png";
import TSIcon from "/public/static/technologies_icons/TS.png";

/*Framework Icons*/
import ReactIcon from "/public/static/technologies_icons/react.png";
import NextIcon from "/public/static/technologies_icons/nextjs.png";
import ElectronIcon from "/public/static/technologies_icons/electronjs.png";

/*Libs Icons*/
import AntdesignIcon from "/public/static/technologies_icons/antdesign.png";

/*Royal Media*/
import RoyalMediaIcon from "/public/static/projects_icon/royalmedia.png";
import RoyalMediaIllustration from "/public/static/projects_illustrations/RoyalMedia-min.png";

/*BushLauncher*/
import BushLauncherIcon from "/public/static/projects_icon/bushlauncher.png";
import BushLauncherIllustration from "/public/static/projects_illustrations/BushLauncher-min.png";

type Technologies = "HTML" | "CSS" | "JS" | "TS" | "react" | "nextjs" | "electronjs" | "antdesign";
export const Technologies: { [key in Technologies]: Technologie } = {
    /*Languages*/
    HTML: {
        key: "HTML", icon: HTMLIcon, type: "Language",
        info: {
            description: {
                English: "HTML is the fundamental language to create pages.",
                French: ""
            },
            timeCount: {English: "5 years +", French: "5 ans +"},
            projectCount: 20
        }
    },
    CSS: {
        key: "CSS", icon: CSSIcon, type: "Language",
        info: {
            description: {
                English: "CSS is the most common way to add style to website.",
                French: ""
            },
            timeCount: {English: "5 years +", French: "5 ans +"},
            projectCount: 20
        }
    },
    JS: {
        key: "JS", icon: JSIcon, type: "Language",
        info: {
            description: {
                English: "",
                French: ""
            },
            timeCount: {English: "5 years +", French: "5 ans +"},
            projectCount: 20
        }
    },
    TS: {
        key: "TS", icon: TSIcon, type: "Language",
        info: {
            description: {
                English: "TS is the solution for bringing a website to life, this is an evolved version of JS.",
                French: ""
            },
            timeCount: {English: "3 years +", French: "3 ans +"},
            projectCount: 6
        }
    },

    /*Frameworks*/
    react: {
        key: "react", displayName: "React", icon: ReactIcon, type: "Framework",
        info: {
            description: {
                English: "React is one of the basics of the next level web creation.",
                French: ""
            },
            timeCount: 550,
            projectCount: 3
        }
    },
    nextjs: {
        key: "nextjs", displayName: "Nextjs", icon: NextIcon, type: "Framework",
        info: {
            description: {
                English: "Nextjs is a popular framework to create high-quality websites built on top of React.",
                French: ""
            },
            timeCount: 240,
            projectCount: 2
        }
    },
    electronjs: {
        key: "electronjs", displayName: "Electronjs", icon: ElectronIcon, type: "Framework",
        info: {
            description: {
                English: "Electronjs is a popular framework to create application from web content.",
                French: ""
            },
            timeCount: 330,
            projectCount: 3
        }
    },

    /*Libs*/
    antdesign: {
        key: "antdesign", displayName: "Antdesign", icon: AntdesignIcon, type: "Lib",
        info: {
            description: {
                English: "Antdesign is a powerful React UI components library, highly flexible, and contain many components",
                French: ""
            },
            timeCount: 550,
            projectCount: 2
        }
    },
} as const;

export const Projects: Project[] = [
    //NOTE: A Limit of 10 sets in ProjectSection Carousel
    {
        key: "royalmedia",
        displayName: "Royal Media",
        description: {
            English: "A web project that combines elegance and efficiency, a website for a new media dedicated to cryptos and Web 3.",
            French: "Un projet web qui combine élegance et efficacité, c’est un site web pour un nouveau média dans le domaine des cryptos et du Web 3."
        },
        icon: RoyalMediaIcon,
        dates: "2023/2024",
        timeCount: 240,
        technologies: [Technologies.nextjs, Technologies.antdesign, Technologies.TS],
        illustration: RoyalMediaIllustration,
        color: "#0a39a1"
    },
    {
        key: "bushlauncher",
        displayName: "BushLauncher",
        description: {
            English: "BushLauncher is a flexible Minecraft Launcher designed to simplify installation of the Minecraft game and its prerequisites, but also of mods, texture packs, etc.",
            French: "BushLauncher est un lanceur Minecraft flexible conçu pour simplifier l’installation du jeu Minecraft et de ses prérequis, mais aussi des mods, des packs de textures, etc."
        },
        icon: BushLauncherIcon,
        dates: "2022/2023",
        timeCount: 310,
        technologies: [Technologies.react, Technologies.electronjs, Technologies.antdesign, Technologies.TS],
        illustration: BushLauncherIllustration,
        color: "#1f9950"
    }
] as const;

export interface ContactData {
    discordLink: string,
    mail: string
}

export const ContactData: ContactData = {
    discordLink: "https://discord.com/users/733592979499122688",
    mail: "gagafeee@gmail.com"
} as const;
