import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/button";

const projects = [
  {
    title: "Project 1",
    description: "Description of Project 1",
    link: "https://project1.com",
  },
  {
    title: "Project 2",
    description: "Description of Project 2",
    link: "https://project2.com",
  },
  // Add more projects as needed
];

export default function Projects() {
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">My Projects</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.title}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{project.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
