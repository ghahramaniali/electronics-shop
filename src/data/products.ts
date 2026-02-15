import { Product } from "@/store/cart-store";

export const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Arduino Uno R3",
    nameFa: "آردوینو اونو R3",
    price: 24.99,
    image: "/product (1).avif",
    description:
      "The Arduino Uno R3 is a microcontroller board based on the ATmega328P.",
    descriptionFa: "آردوینو اونو R3 یک برد میکروکنترلر بر اساس ATmega328P است.",
    category: "Microcontrollers",
    stock: 50,
    specs: {
      Microcontroller: "ATmega328P",
      "Operating Voltage": "5V",
      "Digital I/O Pins": "14",
      "Analog Input Pins": "6",
      "Flash Memory": "32 KB",
    },
  },
  {
    id: "2",
    name: "Raspberry Pi 4 Model B",
    nameFa: "رزبری پای 4 مدل B",
    price: 55.99,
    image: "/product (1).jfif",
    description:
      "The Raspberry Pi 4 Model B is the latest product in the Raspberry Pi single-board computer range.",
    descriptionFa:
      "رزبری پای 4 مدل B جدیدترین محصول در محدوده کامپیوترهای تک بردی رزبری پای است.",
    category: "Single Board Computers",
    stock: 30,
    specs: {
      Processor: "Quad-core Cortex-A72",
      RAM: "4GB LPDDR4",
      WiFi: "802.11ac",
      Bluetooth: "5.0",
      "GPIO Pins": "40",
    },
  },
  {
    id: "3",
    name: "ESP32 DevKitC",
    nameFa: "ESP32 DevKitC",
    price: 12.99,
    image: "/product (2).avif",
    description:
      "ESP32 DevKitC is a development board that integrates the ESP32 chip.",
    descriptionFa:
      "ESP32 DevKitC یک برد توسعه است که چیپ ESP32 را ادغام می کند.",
    category: "WiFi Modules",
    stock: 75,
    specs: {
      Processor: "Dual-core Xtensa LX6",
      WiFi: "802.11 b/g/n",
      Bluetooth: "v4.2 BR/EDR and BLE",
      "Flash Memory": "4 MB",
      "GPIO Pins": "36",
    },
  },
  {
    id: "4",
    name: "STM32F103C8T6 Blue Pill",
    nameFa: "STM32F103C8T6 Blue Pill",
    price: 8.99,
    image: "/product (1).avif",
    description:
      "STM32F103C8T6 Blue Pill is a development board for STM32 microcontrollers.",
    descriptionFa:
      "STM32F103C8T6 Blue Pill یک برد توسعه برای میکروکنترلرهای STM32 است.",
    category: "Microcontrollers",
    stock: 100,
    specs: {
      Microcontroller: "STM32F103C8T6",
      Core: "ARM Cortex-M3",
      "Clock Speed": "72 MHz",
      "Flash Memory": "64 KB",
      RAM: "20 KB",
    },
  },
  {
    id: "5",
    name: "NodeMCU ESP8266",
    nameFa: "NodeMCU ESP8266",
    price: 7.99,
    image: "/product (1).jfif",
    description: "NodeMCU is an open-source IoT platform based on ESP8266.",
    descriptionFa: "NodeMCU یک پلتفرم متن باز IoT بر اساس ESP8266 است.",
    category: "WiFi Modules",
    stock: 60,
    specs: {
      Microcontroller: "ESP8266",
      WiFi: "802.11 b/g/n",
      "Flash Memory": "4 MB",
      "GPIO Pins": "16",
      "ADC Resolution": "10-bit",
    },
  },
  {
    id: "6",
    name: "Arduino Mega 2560",
    nameFa: "آردوینو مگا 2560",
    price: 38.99,
    image: "/product (2).avif",
    description:
      "The Arduino Mega 2560 is a microcontroller board based on the ATmega2560.",
    descriptionFa:
      "آردوینو مگا 2560 یک برد میکروکنترلر بر اساس ATmega2560 است.",
    category: "Microcontrollers",
    stock: 25,
    specs: {
      Microcontroller: "ATmega2560",
      "Operating Voltage": "5V",
      "Digital I/O Pins": "54",
      "Analog Input Pins": "16",
      "Flash Memory": "256 KB",
    },
  },
];
