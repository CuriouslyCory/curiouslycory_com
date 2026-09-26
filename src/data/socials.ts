import {
  FaGithub,
  FaTwitch,
  FaYoutube,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { FaBluesky } from "react-icons/fa6";
import { type IconType } from "react-icons/lib";

/** Twitch numeric user id for CuriouslyCory — used to poll live status. */
export const TWITCH_USER_ID = "512725398";
export const TWITCH_URL = "https://www.twitch.tv/CuriouslyCory";

type Social = {
  title: string;
  url: string;
  icon: IconType;
  isLive?: boolean;
};

export const SOCIALS: Social[] = [
  { title: "GitHub", url: "https://github.com/CuriouslyCory", icon: FaGithub },
  {
    title: "LinkedIn",
    url: "https://www.linkedin.com/in/corysougstad",
    icon: FaLinkedin,
  },
  {
    title: "Twitch",
    url: TWITCH_URL,
    icon: FaTwitch,
  },
  {
    title: "Dev YouTube",
    url: "https://www.youtube.com/@CuriouslyCory",
    icon: FaYoutube,
  },
  {
    title: "Climbing YouTube",
    url: "https://www.youtube.com/@CuriouslyCoryClimbs",
    icon: FaYoutube,
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/curiouslycory",
    icon: FaInstagram,
  },
  {
    title: "Bluesky",
    url: "https://bsky.app/profile/curiouslycory.com",
    icon: FaBluesky,
  },
];
