# Phasmophobia - Paranormal Guide

App to help identify ghosts in the Phasmophobia game.

Access the tool here: **[LINK](https://phasmo.hctr.dev/)**

![App screenshot](docs/screenshot.png)

## How to use

**1.** ✅ Select which evidence you have identified (or excluded)

**2.** 👀 See which ghosts could match that evidence

The table on the right will automatically update to only show ghosts that match those observations

**3.** 🔍 Look for the missing evidence

Evidence that can't be found will be greyed out in the left panel

**4.** 📖 Get more information on each ghost

Expand the section for each ghost to see more information

_The "i" icon on the left side will toggle on or off some extra tips to help find ghosts 🕵️_

## Realtime Sync

If you are playing with friends you can keep your observed evidence in sync with each other!

While connected any change a person makes will be automatically synced to everyone else in the same room, making it easier to work together 🙌

_Note that enabling this feature wll use a [Pocketbase](https://pocketbase.io/) instance as the backend storage and sync server_

## Running Locally

The following commands allow running the project locally.
This assumes you have a working Javascript/ReactJS development environment.

Note that while installation may require an internet connection to download dependencies, the app functional while running offline.
The only exception is the realtime sync feature which, by definition, requires an internet connection.

**1.** `npm install`

This installs all the necessary dependencies.

**2.** `npm start`

This runs the app locally. Once it has started, you can access the app at [http://localhost:3000/](http://localhost:3000/).

## Disclaimers

This is a fun project I built to experiment building an app with Javascript and ReactJS while making something useful for my friends.

This project is in no way affiliated with the Phasmophobia game or its developers. All trademarks are the property of their respective owners.

The font used for the page heading image is "October Crow" by Sinister Fonts ([link](https://www.dafont.com/october-crow.font)).

This project also makes use of the following tools:

- [ReactJS](https://reactjs.org/)
- [Bulma CSS](https://bulma.io/)
- [Pocketbase](https://pocketbase.io/)

The project is currently hosted using Cloudflare pages.
