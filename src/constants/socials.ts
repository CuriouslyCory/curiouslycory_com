import {
  FaDiscord,
  FaLinkedin,
  FaTwitter,
  FaWordpress,
  FaYoutube,
} from "react-icons/fa";
import { GiMirrorMirror } from "react-icons/gi";
import { MdEmail } from "react-icons/md";

export const socialLinks = [
  {
    title: "Twitter",
    href: "https://www.twitter.com/CuriouslyCory",
    Icon: FaTwitter,
  },
  {
    title: "YouTube",
    href: "https://www.youtube.com/@curiouslycory",
    Icon: FaYoutube,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/corysougstad/",
    Icon: FaLinkedin,
  },
  {
    title: "Discord",
    href: "https://discord.gg/r4D9XpDGXN",
    Icon: FaDiscord,
  },
  {
    title: "Mirror",
    href: "https://mirror.xyz/curiouslycory.eth",
    Icon: GiMirrorMirror,
  },
  {
    title: "Maker Blog",
    href: "https://blog.hau.me/",
    Icon: FaWordpress,
  },
  {
    title: "Email",
    href: "mailto:cory@curiouslycory.com",
    Icon: MdEmail,
  },
];
