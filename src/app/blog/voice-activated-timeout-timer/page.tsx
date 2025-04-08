import { CodeBlock } from "~/components/ui/code-block";
import Link from "next/link";

/*
---bm
title: Voice Activated Timeout Timer
excerpt: Creating a voice activated timeout timer for Arduino porojects.
coverImage: /images/blog/voice-activated-timeout-timer.png
publishedAt: 2019-01-05
published: true
featured: false
tags: arduino,capacitive-sensor,diy,electronics,iot,parenting
--- 
*/

export const metadata = {
  title: "DIY Capacitive Sensor for Arduino",
  description: "Creating a voice activated timeout timer",
  openGraph: {
    images: [
      {
        url: "/images/blog/voice-activated-timeout-timer.png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DIY Capacitive Sensor for Arduino",
    description: "Creating a voice activated timeout timer",
  },
};

export default async function CapacitiveSensorPost() {
  return (
    <div className="mx-auto max-w-3xl">
      {/* Custom content section */}
      <div className="prose prose-lg dark:prose-invert mt-12 mb-8 max-w-none">
        <p className="mb-4">
          When dad life and maker life collide, strange things are invented.
          Here&apos;s a build I did recently for a voice activated timeout timer
          that integrates with Google Home or Alexa.
        </p>
        <div className="mb-12 flex justify-center">
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/--e1u4BLO1M?si=7m6Tmfya7eoi6d4S"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>

        <CodeBlock language="arduino">
          {`// MQTT required includes
#include <ESP8266WiFi.h>
#include <Adafruit_MQTT.h>
#include <Adafruit_MQTT_Client.h>

// led strip required includes
#include <NeoPixelBus.h>

// touch sensor
#include <CapacitiveSensor.h>
#include <MedianFilter.h>

// wifi config
#define WIFI_SSID "YOUR SSID"
#define WIFI_PASS "YOUR WPA PASSWORD"

WiFiClient client;

//adafruit IPT config
#define MQTT_SERV "io.adafruit.com"
#define MQTT_PORT 1883
#define MQTT_NAME "YOUR AIO USERNAME"
#define MQTT_PASS "YOUR AIO KEY"

Adafruit_MQTT_Client mqtt(&client, MQTT_SERV, MQTT_PORT, MQTT_NAME, MQTT_PASS);
Adafruit_MQTT_Subscribe timeout = Adafruit_MQTT_Subscribe(&mqtt, MQTT_NAME "/f/timeout");

// Led strip config
const uint16_t PixelCount = 13; // this example assumes 4 pixels, making it smaller will cause a failure
//const uint8_t PixelPin = 3;  // make sure to set this to the correct pin, ignored for Esp8266

#define colorSaturation 32

// three element pixels, in different order and speeds
NeoPixelBus<NeoGrbFeature, Neo800KbpsMethod> strip(PixelCount);

RgbColor red(colorSaturation, 0, 0);
RgbColor green(0, colorSaturation, 0);
RgbColor blue(0, 0, colorSaturation);
RgbColor white(colorSaturation);
RgbColor black(0);

// touch sensor config
CapacitiveSensor capSensor1 = CapacitiveSensor(D0, D1);
CapacitiveSensor capSensor2 = CapacitiveSensor(D0, D2);

void setup()
{
  Serial.begin(115200);
  while (!Serial); // wait for serial attach

  Serial.println();
  Serial.println("Initializing...");
  Serial.flush();

  //Connect to WiFi
  Serial.print("\n\nConnecting Wifi... ");
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
  }
  Serial.println("WIFI connected");

  // this resets all the neopixels to an off state
  strip.Begin();
  strip.Show();
  
  Serial.println();
  Serial.println("Running...");
  
  //Subscribe to the timeout topic
  mqtt.subscribe(&timeout);

  // test countdown
  //countDown(10);
}

void loop()
{
  MQTT_connect();

  //Read from our subscription queue until we run out, or
  //wait up to 5 seconds for subscription to update
  Serial.println("Init Sub...");
  Adafruit_MQTT_Subscribe * subscription;
  Serial.println("Checking Sub...");
  while ((subscription = mqtt.readSubscription(5000)))
  {
    //If we're in here, a subscription updated...
    if (subscription == &timeout)
    {
      
      uint8_t last_read = atoi((char *)timeout.lastread);
      //Print the new value to the serial monitor
      Serial.print("Starting countdown: ");
      Serial.println(last_read);

      countDown(last_read);

    }
  }

  // ping the server to keep the mqtt connection alive
  if (!mqtt.ping())
  {
    mqtt.disconnect();
  }
}

void countDown(uint16_t totalSeconds)
{
  // convert seconds to millis
  totalSeconds = totalSeconds * 1000;
  uint16_t currentSecond = totalSeconds;
  
  unsigned int elapsedTime = 0;
  float currentPct = 100;
  setPct(currentPct);

  while(currentSecond > 0){
    unsigned long lastTime = millis();
    while(isTouched() == true && currentSecond > 0){
      elapsedTime = (millis() - lastTime);
      lastTime = millis();
      Serial.print("Elapsed Time: ");
      Serial.println(elapsedTime);
      if(elapsedTime > currentSecond){
        currentSecond = 0;
      }else{
        currentSecond = currentSecond - elapsedTime;
      }
      Serial.print(currentSecond);
      Serial.print("/");
      Serial.print(totalSeconds);
      Serial.println(" seconds");

      currentPct = (float) currentSecond / (float) totalSeconds * 100;
      Serial.print(currentPct);
      Serial.println("%");
      setPct(currentPct);
      delay(100);
    }
    //no touch sensed
    Serial.println("No touch sensed.");

    delay(100);
  }

  //flash to indicate complete
  flash();
}

boolean isTouched(){
  long sensorValue1 = capSensor1.capacitiveSensor(30);
  long sensorValue2 = capSensor2.capacitiveSensor(30);
  Serial.print("Sensor 1: ");
  Serial.println(sensorValue1);
  Serial.print("Sensor 2: ");
  Serial.println(sensorValue2);
  if(sensorValue1 > 15 && sensorValue2 > 15) {
    return true;
  }
  return false;
}

void flash(){
  setPct(100, green);
  delay(250);
  setPct(0);
  delay(250);
  setPct(100, green);
  delay(250);
  setPct(0);
  delay(250);
  setPct(100, green);
  delay(250);
  setPct(0);
}


// if no color param, set to blue.
void setPct(uint8_t pct){
  setPct(pct, blue);
}

// turn on pct number of lights.
void setPct(uint8_t pct, RgbColor color)
{
  Serial.print("Pct: ");
  Serial.print(pct);
  
  uint16_t pixelsToLight = (float) PixelCount * ((float) pct / 100);
  Serial.print(", Pixels to light");
  Serial.println(pixelsToLight);

  // light the right number of pixels, then turn off the remaining
  for(uint8_t i = 0; i < pixelsToLight; i++){
    strip.SetPixelColor(i, color);
  }
  if(pixelsToLight < PixelCount){
    for(uint8_t i = pixelsToLight; i < PixelCount; i++){
      strip.SetPixelColor(i, black);
    }
  }
  strip.Show();
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
  int8_t ret;

  // Stop if already connected.
  if (mqtt.connected()) 
  {
    return;
  }

  Serial.print("Connecting to MQTT... ");

  uint8_t retries = 3;
  while ((ret = mqtt.connect()) != 0) // connect will return 0 for connected
  { 
       Serial.println(mqtt.connectErrorString(ret));
       Serial.println("Retrying MQTT connection in 5 seconds...");
       mqtt.disconnect();
       delay(5000);  // wait 5 seconds
       retries--;
       if (retries == 0) 
       {
         // basically die and wait for WDT to reset me
         while (1);
       }
  }
  Serial.println("MQTT Connected!");
}`}
        </CodeBlock>

        <Link href="https://github.com/CuriouslyCory/TimeoutTimer/blob/master/TimeoutTimer.ino">
          View on Github
        </Link>
      </div>
    </div>
  );
}
