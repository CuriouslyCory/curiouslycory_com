import React from "react"
import "./mylink.css"

import EtsyLogo from "../images/etsy_logo_sm_rgb.png"
import YoutubeLogo from "../images/yt_logo_rgb_light.png"

const MyLink = ({link, logo}) => <a href={link} target="_blank">{logo}</a>

 export default MyLink