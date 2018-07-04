#! /usr/bin/python3

import RPi.GPIO as GPIO
import time

sensor = 11

GPIO.setmode(GPIO.BCM)
GPIO.setup(sensor,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)

last = False

while True:
	stat = GPIO.input(sensor)
	if stat != last:
		if stat:
			print("1",end="",flush=True)
		else:
			print("0",end="",flush=True)
		last = stat
	time.sleep(1)

