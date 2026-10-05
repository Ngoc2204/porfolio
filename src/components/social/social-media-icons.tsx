"use client";
import { Button } from "../ui/button";
import { SiGithub, SiFacebook } from "react-icons/si";
import { Mail, Phone } from "lucide-react";
import { config } from "@/data/config";
const links=[
 {name:"GitHub",href:config.social.github,icon:<SiGithub size={22}/>},
 {name:"Facebook",href:config.social.facebook,icon:<SiFacebook size={22}/>},
 {name:"Email",href:`mailto:${config.email}`,icon:<Mail size={22}/>},
 {name:"Điện thoại",href:`tel:${config.phone}`,icon:<Phone size={22}/>},
];
export default function SocialMediaButtons(){return <div className="flex z-10">{links.map(link=><a key={link.name} href={link.href} target={link.href.startsWith("https")?"_blank":undefined} rel="noopener noreferrer" aria-label={link.name}><Button variant="ghost" aria-label={link.name}>{link.icon}</Button></a>)}</div>;}

