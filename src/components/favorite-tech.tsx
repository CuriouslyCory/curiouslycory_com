"use client";

import { type ReactNode } from "react";
import {
  FaAndroid,
  FaAngular,
  FaCss3,
  FaEthereum,
  FaGithub,
  FaHardHat,
  FaHtml5,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiClaude,
  SiMysql,
  SiNextdotjs,
  SiOpenai,
  SiPostgresql,
} from "react-icons/si";
import { motion } from "motion/react";
import SvgServiceNow from "~/components/custom-icons/service-now";
import { Card, CardContent, CardHeader } from "./ui/card";

export const FavoriteTech = (): ReactNode => {
  const tech = [
    { title: "NextJs", icon: SiNextdotjs },
    { title: "React", icon: FaReact },
    { title: "Angular", icon: FaAngular },
    { title: "HTML", icon: FaHtml5 },
    { title: "CSS", icon: FaCss3 },
    { title: "NodeJs", icon: FaNodeJs },
    { title: "Solidity", icon: FaEthereum },
    { title: "Hardhat", icon: FaHardHat },
    { title: "Android", icon: FaAndroid },
    { title: "PostgreSql", icon: SiPostgresql },
    { title: "MySql", icon: SiMysql },
    { title: "ServiceNow", icon: SvgServiceNow },
    { title: "Github", icon: FaGithub },
    { title: "OpenAI", icon: SiOpenai },
    { title: "Claude", icon: SiClaude },
  ];

  return (
    <Card className="p-2 md:p-6">
      <CardHeader>
        <h2 className="font-oswald text-2xl font-semibold tracking-tight text-center md:text-left">
          My Main Toolbox
        </h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row flex-wrap justify-center gap-16">
          {tech.map((item, index) => (
            <motion.div
              key={`fav-tech-${item.title}`}
              className="flex w-32 flex-col items-center hover:bg-primary/10 rounded-xl p-4 transition-colors duration-200"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{
                default: { duration: 0.4, delay: index * 0.05 },
                y: { type: "spring", stiffness: 400, damping: 20 },
                scale: { type: "spring", stiffness: 400, damping: 20 },
              }}
              viewport={{ once: true }}
            >
              <item.icon className="text-6xl" />
              <h3 className="text-sm font-medium">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
