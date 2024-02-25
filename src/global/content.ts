import {Project, Technologie} from "@/global/global";

import ReactIcon from "/public/static/icons/react.png";

import RoyalMediaIllustration from "/public/static/projects_illustrations/RoyalMedia.png";
import BushLauncherIllustration from "/public/static/projects_illustrations/BushLauncher.png";

export const Technologies: { [key: string]: Technologie } = {
    react: {
        key: "react", displayName: "React", icon: ReactIcon
    }
} as const;

export const Projects: Project[] = [
    //NOTE: A Limit of 10 sets in ProjectSection Carousel
    {
        key: "test",
        displayName: "Test Project",
        description: "Lorem ipsum dolor sit amet",
        icon: ReactIcon,
        dates: "2024/2025",
        timeCount: 0,
        technologies: [Technologies.react, Technologies.react],
        illustration: RoyalMediaIllustration,
        link: {url: "https://github.com/Gagafeee"},
        color: "#0a39a1"
    },
    {
        key: "test2",
        displayName: "Test Project 2nd",
        description: "Lorem ipsum dolor sit amet,Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet",
        icon: ReactIcon,
        dates: "2024/2025",
        timeCount: 0,
        technologies: [Technologies.react, Technologies.react],
        illustration: BushLauncherIllustration,
        color: "#1f9950"
    },
    {
        key: "test3",
        displayName: "Test Project 3rd",
        description: "Lorem ipsum dolor sit amet",
        icon: ReactIcon,
        dates: "2024/2025",
        timeCount: 0,
        technologies: [Technologies.react, Technologies.react],
        illustration: RoyalMediaIllustration,
        link: {url: "https://github.com/Gagafeee"},
        color: "#FFFFFF"
    },
    {
        key: "test4",
        displayName: "Test Project 4th",
        description: "Lorem ipsum dolor sit amet",
        icon: ReactIcon,
        dates: "2024/2025",
        timeCount: 0,
        technologies: [Technologies.react, Technologies.react],
        illustration: RoyalMediaIllustration,
        color: "#FFFFFF"
    }
] as const;
