#! /usr/bin/python3

import sys
temp = 25
print("%d" % temp, end="")
sys.exit()




import RPi.GPIO as GPIO
import dht11

# initialize GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.cleanup()

# read data using pin 14
instance = dht11.DHT11(pin=24)

result = instance.read()
if result.is_valid():
	print("%d" % result.temperature, end="")
