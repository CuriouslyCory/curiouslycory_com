import {
  FaAndroid,
  FaAngular,
  FaCss3,
  FaEthereum,
  FaHardHat,
  FaHtml5,
  FaJira,
  FaReact,
} from "react-icons/fa";
import { SiMysql, SiPostgresql } from "react-icons/si";
import SvgServiceNow from "../../components/custom-icons/service-now";

export const FavoriteTech = (): JSX.Element => {
  const tech = [
    { title: "React", icon: FaReact },
    { title: "Angular", icon: FaAngular },
    { title: "HTML", icon: FaHtml5 },
    { title: "CSS", icon: FaCss3 },
    { title: "Solidity", icon: FaEthereum },
    { title: "Hardhat", icon: FaHardHat },
    { title: "Android", icon: FaAndroid },
    { title: "PostgreSql", icon: SiPostgresql },
    { title: "MySql", icon: SiMysql },
    { title: "ServiceNow", icon: SvgServiceNow },
    { title: "Jira", icon: FaJira },
  ];

  return (
    <section className="w-full mt-10 md:mt-32 p-10 bg-opacity-10 flex justify-center">
      <div className="w-full justify-center items-center px-2 md:px-20">
        <div className="flex flex-row flex-wrap justify-center gap-16">
          {tech.map((tech) => (
            <div
              key={`fav-tech-${tech.title}`}
              className="flex flex-col items-center w-48"
            >
              <tech.icon className="text-6xl" />
              <h3 className="text-4xl">{tech.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
