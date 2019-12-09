[![Build Status](https://travis-ci.org/ericminio/yop-sequence-diagram.svg?branch=master)](https://travis-ci.org/ericminio/yop-sequence-diagram)

# generate diagram

```
node index.js leage.json
```

```

+------------+           +----------+                          +----------------+
|  superman  |           |  batman  |                          |  wonder woman  |
+------------+           +----------+                          +----------------+
|                        |                                     |
|   ok... so you can fly?|                                     |
|<-----------------------|                                     |
|                        |                                     |
|yes Sir                 |                                     |
|----------------------->|                                     |
|                        |                                     |
|                        |can we trust him?                    |
|                        |------------------------------------>|
|                        |                                     |
|                        |                             why not?|
|                        |<------------------------------------|
|                        |                                     |
|                        |well, he is from another planet...   |
|                        |------------------------------------>|
|                        |                                     |
|                        |     from which planet are you again?|
|<-------------------------------------------------------------|
|                        |                                     |
|Krypton                 |                                     |
|------------------------------------------------------------->|
|                        |                                     |
|                        |                             he is ok|
|                        |<------------------------------------|
|                        |                                     |
|                        |I will keep an eye on him!           |
|                        |------------------------------------>|
|                        |                                     |
|                      :)|                                     |
|<-----------------------|                                     |
```