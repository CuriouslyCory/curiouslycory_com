import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function Resume() {
  return (
    <div className="space-y-8">
      <h1 className="mb-6 text-3xl font-bold">Resume</h1>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Work Experience</h2>
        <Card>
          <CardHeader>
            <CardTitle>Software Developer at TechCorp</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-sm text-muted-foreground">
              January 2020 - Present
            </p>
            <ul className="list-inside list-disc">
              <li>
                Developed and maintained web applications using React and
                Node.js
              </li>
              <li>
                Collaborated with cross-functional teams to deliver high-quality
                software
              </li>
              <li>
                Implemented CI/CD pipelines to improve development workflow
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Education</h2>
        <Card>
          <CardHeader>
            <CardTitle>Bachelor of Science in Computer Science</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2 text-sm text-muted-foreground">
              University of Technology, 2016 - 2020
            </p>
            <p>
              Relevant coursework: Data Structures, Algorithms, Web Development,
              Database Systems
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Skills</h2>
        <Card>
          <CardContent className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="mb-2 font-semibold">Programming Languages</h3>
              <ul className="list-inside list-disc">
                <li>JavaScript (ES6+)</li>
                <li>TypeScript</li>
                <li>Python</li>
                <li>Java</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 font-semibold">Frameworks & Libraries</h3>
              <ul className="list-inside list-disc">
                <li>React</li>
                <li>Next.js</li>
                <li>Node.js</li>
                <li>Express</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
