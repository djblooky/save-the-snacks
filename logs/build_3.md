# Build 3 Update - Prototype

[Return to README](../README.md)

## Build Features:

* Updated UI flow and added new temp art
    * Player will exit through the shop
    * The shop screen will take you back to the level
* Implemented enemy and collision with player (movement AI disabled - still unstable)
    * player will lose a life on enemy collision
    * Game over state when all lives are lost

## Behind the scenes progress:

* I spent the majority of my time working on a random enemy movement 
    * Movement has proven to be the most complex/time-consuming thing to implement so far
    * This is very close - I'm just figuring out how to do path detection while the enemy is moving. rather than on collision
* Began functions for sword collectibles: collected and activated states
* Mock-ups/sketches for shop & title screen (updated in docs)
* Build 4 should be my vertical slice, which should have the enemy movement in place and swords fully implemented with temp art.