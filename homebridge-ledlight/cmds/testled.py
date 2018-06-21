#! /usr/bin/python3

#coding:utf-8


def hsv2rgb(h,s,v):
    if s == 0:
        return v,v,v

    if h == 360:
        h=0
    hi = int(h/60)
    f = h/60.0 - hi
    m = v - v*s/100
    n = v - (v*s/100)*f
    k = v - (v*s/100)*(1-f)

    if hi == 0:
        return v,k,m
    if hi == 1:
        return n,v,m
    if hi == 2:
        return m,v,k
    if hi == 3:
        return m,n,v
    if hi == 4:
        return k,m,v
    if hi == 5:
        return v,m,n

    return v,v,v


while True:
#    rpa = map(int, input().split())
    rpa = [int(s) for s in input().split()]
    if rpa[0] == -1:
        break
    pa = hsv2rgb(rpa[0],rpa[1],rpa[2])
    print(pa)

