# magnets
solver for a "magnets" puzzle

Example for such types of puzzles:

https://www.chiark.greenend.org.uk/~sgtatham/puzzles/js/magnets.html

## Rules

A rectangular grid has been filled with a mixture of magnets (that is, dominoes with one positive end and one negative end) and blank dominoes (that is, dominoes with two neutral poles). These dominoes are initially only seen in silhouette. Around the grid are placed a number of clues indicating the number of positive and negative poles contained in certain columns and rows.

Your aim is to correctly place the magnets and blank dominoes such that all the clues are satisfied, with the additional constraint that no two similar magnetic poles may be orthogonally adjacent (since they repel). Neutral poles do not repel, and can be adjacent to any other pole.

## Solver

This solver tries to solve the puzzle.
