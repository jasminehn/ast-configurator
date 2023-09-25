# Modification

This tool was meant to be extended as the AST grows. Here is a list of various modifications that are easy or not-so-easy to make.

Also beware test cases breaking with changes to the user flow! This includes adding questions.

## I want to... 

## Add a screening question/section

If you want to add a question to the existing screener, you can just append the question to the `questions` array within the section's json file (curently `app/public/section.json`). If you want to add a whole new section onto the screener, create a properly-formed section JSON file and import it within the `pre` group in `groups.config.ts` like the others.

## Add a piece of software

Software is kept in `software.json`. Each software object has information about it and conditions for it being available. See `Conditions.md` for more on conditions. Just append new software to the `software` array.

## Add a setup question/section

Just follow the screening steps, but do modifications within the correct JSON files (currently stored in `app/public/post`) and within the `post` group within `groups.config.ts`.

## Add a group

The Configurator was designed with a specific flow in mind: a home screen, a screener group, a software select screen, a configuration group, and a download screen. Why you would want to add a group, I don't know. But you can just append a new one to `groups` in `groups.config.ts`. Just make sure to define a screen in `screens.config.ts` with the name of the group and type `group`.

## Reorder sections within a group

Just change their order within the group in `groups.config.ts`. Just make sure you don't have any sections w/ conditions that are dependent on questions that come after it.

**Everything past here will be more difficult and will require writing actual code.**

## Add a screen

Screens can be dynamically imported and added to the application in `screens.config.ts`. Screens are React components that take in the `IPage` interface for routing. For more information on the routing interface, see `Configuration.md`. Example screens can be seen in the `app/screens` directory (`home.tsx`, `review.tsx`, `select.tsx`).

## Modify a screen

The three custom screens (`home.tsx`, `review.tsx`, `select.tsx`) can be modified as needed within the `app/screens` directory.

## Modify how groups are displayed

Each group is constructed using the `GroupBuilder` function at build, located at `app/screens/group.tsx`. This function returns a page that uses the `IPage` interface based on which group index is passed in (index taken from `groups.config.tsx`). Any modifications to this function will impact every other group displayed in the application

## Modify styling

uh. `app/styles`. Good luck ;-;

## Modify the internal state management

Internal state is managed by Rematch, a library based off Redux. Files can be found in `app/state`. Beware for typescript users, Rematch does NOT have amazing type autosense. 

## Add tests

Add a new `*.cy.ts` file into `app/cypress/e2e`. E2E tests are written with Cypress. Certain elements, specifically ones with input, have `data-cy` attributes assigned to them based on props like the question ID and the value associated with that option. These elements can be queried easily as shown in the example tests.