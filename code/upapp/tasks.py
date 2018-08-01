# -*- coding:utf-8 -*-
import time
import os

from background_task import background

@background(schedule=0)
def b1task(name):
    st = time.time()
    time.sleep(5)
    endt = time.time()
    print("b1task {} cost {:.2f}.".format(name,endt-st))
    with open("test_b1task.txt","w") as f:
        f.write("b1task {} cost {:.2f}.".format(name,endt-st))
