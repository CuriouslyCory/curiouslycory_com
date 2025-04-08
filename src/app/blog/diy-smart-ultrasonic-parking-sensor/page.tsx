import { CodeBlock } from "~/components/ui/code-block";
import Link from "next/link";
import Image from "next/image";

/*
---bm
title: DIY Smart Ultrasonic Parking Sensor
excerpt: Creating a smart ultrasonic parking sensor.
coverImage: /images/blog/diy-smart-ultrasonic-parking-sensor.png
publishedAt: 2019-01-11
published: true
featured: false
tags: arduino,capacitive-sensor,diy,electronics,iot,parenting
--- 
*/

export const metadata = {
  title: "DIY Smart Ultrasonic Parking Sensor",
  description: "Creating a smart ultrasonic parking sensor.",
  openGraph: {
    images: [
      {
        url: "/images/blog/diy-smart-ultrasonic-parking-sensor.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIY Smart Ultrasonic Parking Sensor",
    description: "Creating a smart ultrasonic parking sensor.",
  },
};

export default async function CapacitiveSensorPost() {
  return (
    <div className="mx-auto max-w-3xl">
      {/* Custom content section */}
      <div className="prose prose-lg dark:prose-invert mt-12 mb-8 max-w-none">
        <p className="mb-4">
          Build your own parking sensor to help you park and tie into your smart
          home to trigger automation actions.
        </p>
        <div className="mb-12 flex justify-center">
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/fuI3TvVdcFA?si=ApyDRzyHCtUGzoHY"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <CodeBlock language="arduino">
          {`// All of the following includes are for WIFI
#include <ESP8266WiFi.h>          //ESP8266 Core WiFi Library (you most likely already have this in your sketch)
#include <WiFiManager.h>         // https://github.com/tzapu/WiFiManager

// MQTT IOT Includes
#include <PubSubClient.h>

//ultrasonic library https://github.com/Martinsos/arduino-lib-hc-sr04
#include <HCSR04.h>

// defines pins numbers
const int trigPin = D2;  //D2
const int echoPin = D1;  //D1
const int greenPin = D5; //D4
const int redPin = D4; //D5

//
UltraSonicDistanceSensor distanceSensor(trigPin, echoPin);

// defines variables
double last_dist, cur_dist;

// wifi config
// wifi auto configs using wifi manager. Just boot the device, then connect to the "ParkingSensorSetup" network
// after connecting, if you're not automatically redirected go to http://192.168.4.1 in your web browser.

// MQTT config
#define MQTT_SERV "192.168.50.167"
#define MQTT_PORT 1883
#define MQTT_NAME "YOUR MQTT USER"
#define MQTT_PASS "YOUR MQTT PASS"
#define MQTT_TOPIC "stat/garagebay1/parking"

WiFiClient client;
PubSubClient pubclient(MQTT_SERV, MQTT_PORT, client);

String macToStr(const uint8_t* mac)
{
  String result;
  for (int i = 0; i < 6; ++i) {
    result += String(mac[i], 16);
    if (i < 5)
      result += ':';
  }
  return result;
}

void setup() {
  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  Serial.begin(115200); // Starts the serial communication

  //Connect to WiFi
  Serial.print("\n\nConnecting Wifi... ");
  WiFiManager wifiManager;
  wifiManager.autoConnect("ParkingSensorSetup");

  Serial.println("Wifi Connected!");
  
  pinMode(greenPin, OUTPUT);     // Initialize the LED_BUILTIN pin as an output
  pinMode(redPin, OUTPUT);     // Initialize the LED_BUILTIN pin as an output
  digitalWrite(greenPin, LOW);
  digitalWrite(redPin, HIGH);

}

void loop() {
  MQTT_connect();
  
  cur_dist = distanceSensor.measureDistanceCm();

  Serial.print(cur_dist);
  Serial.print("cm");
  Serial.println();

  
  if(cur_dist < 140.00  && last_dist >= 140.00){
    digitalWrite(greenPin, LOW);
    digitalWrite(redPin, HIGH);
    pubclient.publish(MQTT_TOPIC, "PARKED");
    Serial.println("Publish: PARKED");
  }

  if(cur_dist >= 140.00  && last_dist < 140.00){
    digitalWrite(redPin, LOW);
    digitalWrite(greenPin, HIGH);
    pubclient.publish(MQTT_TOPIC, "VACANT");
    Serial.println("Publish: VACANT");
  }

  last_dist = cur_dist;
  
  delay(500);
}

/***************************************************
  Adafruit MQTT Library ESP8266 Example

  Must use ESP8266 Arduino from:
    https://github.com/esp8266/Arduino

  Works great with Adafruit's Huzzah ESP board & Feather
  ----> https://www.adafruit.com/product/2471
  ----> https://www.adafruit.com/products/2821

  Adafruit invests time and resources providing this open source code,
  please support Adafruit and open-source hardware by purchasing
  products from Adafruit!

  Written by Tony DiCola for Adafruit Industries.
  MIT license, all text above must be included in any redistribution
 ****************************************************/

void MQTT_connect() 
{
  // Stop if already connected.
  if (pubclient.connected()) 
  {
    return;
  }

  Serial.print("Connecting to MQTT... ");

  // Generate client name based on MAC address and last 8 bits of microsecond counter
  String clientName;
  clientName += "esp8266-";
  uint8_t mac[6];
  WiFi.macAddress(mac);
  clientName += macToStr(mac);
  clientName += "-";
  clientName += String(micros() & 0xff, 16);

  Serial.print("Connecting to ");
  Serial.print(MQTT_SERV);
  Serial.print(" as ");
  Serial.println(clientName);
  
  if (pubclient.connect((char*) clientName.c_str(), MQTT_NAME, MQTT_PASS)) {
    Serial.println("Connected to MQTT broker");
    Serial.print("Topic is: ");
    Serial.println(MQTT_TOPIC);
  }
  else {
    Serial.println("MQTT connect failed");
    Serial.println("Will reset and try again...");
    abort();
  }

  //uint8_t retries = 3;
  //while ((ret = mqtt.connect()) != 0) // connect will return 0 for connected
  //{ 
  //     Serial.println(mqtt.connectErrorString(ret));
  //     Serial.println("Retrying MQTT connection in 5 seconds...");
  //     mqtt.disconnect();
  //     delay(5000);  // wait 5 seconds
  //     retries--;
  //     if (retries == 0) 
  //     {
  //       // basically die and wait for WDT to reset me
  //       while (1);
  //     }
  // }
  Serial.println("MQTT Connected!");

  
}`}
        </CodeBlock>

        <Link href="https://github.com/CuriouslyCory/UltrasonicParkingSensor">
          View on Github
        </Link>

        <p className="my-4">Here&apos;s the schematic</p>
        <Image
          src="/images/blog/parking-sensor-diagram.jpg"
          alt="DIY Smart Ultrasonic Parking Sensor Circuit Diagram"
          width={500}
          height={1000}
        />
      </div>
    </div>
  );
}
