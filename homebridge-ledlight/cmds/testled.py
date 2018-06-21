#! /usr/bin/python3

#coding:utf-8


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


while True:
#    rpa = map(int, input().split())
    rpa = [int(s) for s in input().split()]
    if rpa[0] == -1:
        break
    pa = hsv2rgb(rpa[0],rpa[1],rpa[2])
    print(pa[0])
    print(pa[1])
    print(pa[2])

