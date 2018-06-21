#/usr/bin/python3

#coding:utf-8

while True:
    rpa = map(int, raw_input().split())
    if rpa[0] == -1:
        break
    pa = hsv2rgb(rpa[0],rpa[1],rpa[2])
    print(pa[0])
    print(pa[1])
    print(pa[2])

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
    else if hi == 1:
        r = n
        g = v
        b = m
    else if hi == 2:
        r = m
        g = v
        b = k
    else if hi == 3:
        r = m
        g = n
        b = v
    else if hi == 4:
        r = k
        g = m
        b = v
    else if hi == 5:
        r = v
        g = m
        b = n

    return r,g,b
