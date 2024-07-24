
## Angular Signals In Depth The Complete Guide

![](screenshots/angular_signals.png)

Angular Signals is a system that granularly tracks how and where your state is used throughout an application, allowing the framework to optimize rendering updates1. A signal is a wrapper around a value that can notify interested consumers when that value changes. Signals can contain any value, from simple primitives to complex data structures. A signal’s value is always read through a getter function, which allows Angular to track where the signal is used.





