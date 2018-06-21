#! /usr/bin/python3

#coding:utf-8
import RPi.GPIO as GPIO
#macro
ledr=23 #16
ledg=24 #18
ledb=25 #22

#settings
GPIO.setmode(GPIO.BCM)
GPIO.setup(ledr,GPIO.OUT,initial=GPIO.LOW)
GPIO.setup(ledg,GPIO.OUT,initial=GPIO.LOW)
GPIO.setup(ledb,GPIO.OUT,initial=GPIO.LOW)

#pwm signal
pr=GPIO.PWM(ledr,100)#1000Hz
pg=GPIO.PWM(ledg,100)#1000Hz
pb=GPIO.PWM(ledb,100)#1000Hz
#start of pwm
pr.start(0) #duty ratio is 0%
pg.start(0) #duty ratio is 0%
pb.start(0) #duty ratio is 0%

while True:
#    rpa = map(int, input().split())
    rpa = [int(s) for s in input().split()]
    if rpa[0] == -1:
        break
    pa = hsv2rgb(rpa[0],rpa[1],rpa[2])
    pr.ChangeDutyCycle(pa[0])
    pg.ChangeDutyCycle(pa[1])
    pb.ChangeDutyCycle(pa[2])

#cleanup
pr.stop()
pg.stop()
pb.stop()
GPIO.cleanup()


def hsv2rgb(h,s,v):
    r = v
    g = v
    b = v

    if s == 0:
        return r,g,b

    if h == 360:
        h=0
    hi = h/60
    f = h/60.0 - hi
    m = v - v*s/100
    n = v - (v*s/100)*f
    k = v - (v*s/100)*(1-f)

    if hi == 0:
        r = v
        g = k
        b = m
    if hi == 1:
        r = n
        g = v
        b = m
    if hi == 2:
        r = m
        g = v
        b = k
    if hi == 3:
        r = m
        g = n
        b = v
    if hi == 4:
        r = k
        g = m
        b = v
    if hi == 5:
        r = v
        g = m
        b = n

    return r,g,b
