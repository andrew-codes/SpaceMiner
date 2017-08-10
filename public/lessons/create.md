---
id: create
author: Josh Gough
topics:
 - creating worlds
 - drilling mines
sub-topics:
 - functions
---

# Create a new world

You create new worlds in SpaceMiner using JavaScript code. You do this by calling **functions** built-into SpaceMiner to customize how the world gets drawn on the screen and how to change the world when different **events** happen.

# Create a new world

You create new worlds in SpaceMiner using JavaScript code. The easiest way involves calling **functions** built-into SpaceMiner to customize how the world gets drawn on the screen and how to change the world when different **events** happen.

If the words **functions** and **events** are new to you, don't worry. You'll learn much more about what they mean within code as you go through the missions. In this lesson, we'll only focus on functions, so let's continue to try out your first function.

## function

Within SpaceMiner, a **function** is a word you type into the code that controls what the program does. 

Hit the **Update & preview world** below to get your brand new world in a pop-up window. 

**Note:** you might need to unlock the pop-up blocker in your browser's top-right corner of this window to allow this first.

You'll notice that the world is very plain. It's just full of rocks! That's because you haven't used any functions yet! Let's keep moving.

${createSimple('create')}

## start your world

You need to call the `start` function to get things happening on your world. Simply type `start` into the code editor below and then press the **Update & preview world** world button again.

Don't be surprised when the world looks the same as it did before. That's because you haven't passed any **arguments** to the `start` function!

${createSimple('create')}

## start an argument

Some functions let or need you to give them extra pieces of data. We call these extra pieces of data **arguments**. 

In this case an argument is not something that makes the program angry. Instead, from the old Latin word *arguere*, it just means to **"make clear"**.

When you give **arguments** to a function you are simply making it clear what you want the program to do for you.

But, don't be too angry with yourself if it takes you a while to get the hang of functions and arguments. 

SpaceMiner won't talk back to you if you do try to argue with it, but speaking aloud what you're trying to do might make it more clear in your own mind!

## Drill a mine with an argument

Let's use function arguments now to make your world look different. This is easy too:

Change that word `start` to this: `start(mine)` and then press the **Update & preview world** world button.

${createSimple('create')}

You should now see that a simple mine gets drilled at the top, left to reveals a coin.

## Drill a larger mine

Now that you've seen how to drill a small mine, let's drill a larger one.

Modify your code so that it looks like this:

${programExample('start(mine, mine(at(2)))')}

${createSimple('create')}

If you run this code, you will see that you now have a mine that reveals two coins.

## Drill a mine with three coins

Here's another example that drills a mine revealing three coins:

${programExample('start(mine, mine(at(2)), mine(at(3)))')}

${createSimple('create')}

${ask('Are you starting to see a pattern here? How would you change the code to reveal four coins in a mine?')}

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