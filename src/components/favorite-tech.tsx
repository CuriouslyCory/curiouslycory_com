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
import { SiMysql, SiNextdotjs, SiPostgresql } from "react-icons/si";
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
  ];

  return (
    <Card className="p-2 md:p-6">
      <CardHeader>
        <h2 className="h-underline text-center text-2xl font-bold md:text-left">
          My Main Toolbox
        </h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row flex-wrap justify-center gap-16">
          {tech.map((tech) => (
            <div
              key={`fav-tech-${tech.title}`}
              className="flex w-32 flex-col items-center"
            >
              <tech.icon className="text-6xl" />
              <h3 className="text-4xl">{tech.title}</h3>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
