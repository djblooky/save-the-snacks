# Build 4 Update - Alpha

[Return to README](../README.md)

## Build Features:

* Created basic shop functionality
    * Purchasing from the shop via button press
    * Cost of item increases with each purchase
    * Coins are removed
* Implemented AI enemy movement
    * Randomly selects path to turn down based on available options
    * Wraps around map
* Fully implemented sword collectibles 
    * Can be activated to defeat enemies
    * Multiple swords collected will stack
    * Button appears when swords are held - can be pressed to activate
* UI button size/placement tweaks

## Known issues:

* Enemy will sometimes get stuck on a particular turn (page refresh)
* Coins/high score do not yet save or carry over restarts

## Behind the scenes progress:

* Currently working on finishing art assets to be swapped out for temp assets
* Implementing multiple accumulating enemies in-progress. I am trying to ensure that my base enemy is moving perfectly (not getting stuck) before creating several of it and causing additional problems. A test of this showed that it is not yet functioning properly
* Began shop saving functionality