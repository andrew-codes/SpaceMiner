---
id: create
author: Josh Gough
topics:
 - functions
 - arguments
 - drilling mines
sub-topics:
 - events
 - vertical mines
---

# Create a new world

You create new worlds in SpaceMiner using JavaScript code. The easiest way involves calling **functions** built-into SpaceMiner to customize how the world gets drawn on the screen and how to change the world when different **events** happen.

If the words **functions** and **events** are new to you, don't worry. You'll learn much more about what they mean within code as you go through the missions. For now, continue to see two simple definitions.

# Create a new world

You create new worlds in SpaceMiner using JavaScript code. The easiest way involves calling **functions** built-into SpaceMiner to customize how the world gets drawn on the screen and how to change the world when different **events** happen.

If the words **functions** and **events** are new to you, don't worry. You'll learn much more about what they mean within code as you go through the missions. For now, let's start with what a function is by continuing.

## function

Within SpaceMiner, a **function** is a word you type into the code that controls what the program does. 

The first thing you can do is to start your new world. You do this by using the `start` function. Most functions in SpaceMiner need you to call them by adding parentheses on the end of them. For `start` that means you call it by typing it this way: `start()`.

Try it below!

${training('create', 'create', \`\`)}

## Simple function: start

Is it still here?

${training('create', 'create', \`\`)}

## FUNCTIONS ARGUMENTS

Some functions let you give them extra data. We call these extra **arguments**. In this case an argument is not something that makes the program angry. Instead, from the old Latin word *arguere*, it just means to **"make clear"**. When you give **arguments** to a function you are simply making it clear what you want the program to do for you.

But, don't be too angry with yourself if it takes you a while to get the hang of functions and arguments, and remember that even though SpaceMiner won't talk back to you, sometimes it does help to speak out loud what you are thinking and what you want it to do to make the thoughts clear in your own mind!

## Drilling Mines

 

## Simple Mines

Here's the simplest example:

```javascript
start(mine);
```

If you run this code, you will see that the a simple mine gets drilled that reveals a coin.

Here's another example that drills two distinct mines:

```javascript
start(
    mine,
    mine(at(2))
);
```
You could also think of this mine as being a single mine that contains two coins.

And, here's one that drills a mine with three coins:
```
start(
    mine,
    mine(at(2)),
    mine(at(3))
);
```

## Challenge: Drill a Four-Coin Mine

Now, you try to add another line of code to make the mine contain four coins.

## Simpler Simple Mines

Now that you know how to drill mines that contain up to four coins, how do you feel about drilling one that has 10? Do you want to type all the code? It's ok to say no!

Here's a different way to drill a mine that contains four coins:

```javascript
start(mine(width(4)));
```

## Challenge: Drill a Ten-Coin Mine

Modify the code to make the mine ten coins wide.