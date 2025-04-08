import { api } from "~/trpc/server";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import Image from "next/image";
import { CodeBlock } from "~/components/ui/code-block";
import BlogHero from "~/components/blog/hero";

/*
---bm
title: DIY Capacitive Sensor for Arduino
excerpt: Creating a quick and simple capacitive sensor for Arduino porojects.
coverImage: /images/blog/diy-capacitive-sensor-for-arduino.jpg
publishedAt: 2018-12-31
published: true
featured: false
tags: arduino,capacitive-sensor,diy,electronics
--- 
*/

export const metadata = {
  title: "DIY Capacitive Sensor for Arduino",
  description:
    "Creating a quick and simple capacitive sensor for Arduino porojects.",
  openGraph: {
    images: [
      {
        url: "/images/blog/diy-capacitive-sensor-for-arduino.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIY Capacitive Sensor for Arduino",
    description:
      "Creating a quick and simple capacitive sensor for Arduino porojects.",
  },
};

export default async function CapacitiveSensorPost() {
  return (
    <div className="mx-auto max-w-3xl">
      <BlogHero
        title="DIY Capacitive Sensor"
        subtitle="for Arduino"
        image="/images/blog/diy-capacitive-sensor-for-arduino.png"
        tags={["Arduino", "Capacitive Sensor"]}
      />

      {/* Custom content section */}
      <div className="prose prose-lg dark:prose-invert mt-12 mb-8 max-w-none">
        <p className="mb-4">
          I&apos;ve been using capacitive touch sensors in a number of my
          projects recently and just wanted to share a really quick and easy way
          to build one for yourself that works with Arduinos.
        </p>

        <p>You’ll need:</p>

        <ul className="mb-4 list-inside list-disc">
          <li>Tin foil</li>
          <li>
            An arduino capable development board (https://amzn.to/2BUbDRU)
          </li>
          <li>10k Ohm (1k – 1M all work) (https://amzn.to/2Rn4wLU)</li>
          <li>Bread board and leads (https://amzn.to/2GXfO5A)</li>
          <li>Soldering Iron & Solder (https://amzn.to/2C2u6Mz)</li>
        </ul>
        <Image
          src="/images/blog/cap-sensor-diagram.jpg"
          alt="DIY Capacitive Sensor for Arduino"
          width={1000}
          height={1000}
          className="flex-1"
        />

        <p className="my-4">
          Start by soldering a lead to a small piece of tin foil. Additional
          flux seemed to really help this process. Connect the resistor to a
          digital out pin (I used D0 on my Wemos D1 Mini) and the breadboard. On
          the same row of the breadboard connect both the sensor (tin foil lead)
          and a Digital In pin (I used D1).
        </p>

        <CodeBlock language="arduino">
          {`// touch sensor
#include <CapacitiveSensor.h>

// touch sensor config
CapacitiveSensor capSensor1 = CapacitiveSensor(D0, D1);

void setup() {
  Serial.begin(115200);
}

void loop() {
  long sensorValue1 = capSensor1.capacitiveSensor(30);
  Serial.println(sensorValue1);
  delay(500);
}`}
        </CodeBlock>

        <p className="my-4">
          The CapacitiveSensor library is available in the Library Manager and
          is the one by Paul Bagder and Paul Stoffregen.
        </p>
        <p className="my-4">
          Here’s a video of the project. Have fun, and happy hacking!
        </p>
        <div className="flex justify-center">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/qhvorTE1TGI?si=EnxVDHkS7GkaY0fD"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
