# Get Rich or Die

Get rich or Die is a simple canvas HTML5 game where the goal is to collect as much cash tokens as possible in order to survive as your health continues to drop

![Screen Shot 2022-02-19 at 10 11 31 PM](https://user-images.githubusercontent.com/59832188/154828127-a1b36733-69cd-4f42-be63-e8b02e5cc872.png)

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run watch` | Build project and open web server running project, watching for changes |
| `npm run dev` | Builds project and open web server, but do not watch for changes |
| `npm run build` | Builds code bundle with production settings (minification, no source maps, etc..) |

## Folder structure

| Folder | Description |
|---------|-------------|
| `public/` | this folder is meant contain all assets. Contents get copied to the `dist/` folder during build so loading assets should not be imported from here |
| `src/` | this is the project's root containing all source code |
| `src/game.ts` | phaser game configs and entry point/initializer. This is also the main source file to be used as rollup.js' compilation source |
| `src/scenes/` | in here you will find all of the game scenes fully indexed |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development
server by running `npm run watch`.

After starting the development server with `npm run watch`, you can edit any files in the `src` folder
and Rollup will automatically recompile and reload your server (available at `http://localhost:10001`
by default).

## Configuring Rollup

* Edit the file `rollup.config.dev.js` to edit the development build.
* Edit the file `rollup.config.dist.js` to edit the distribution build.

You will find lots of comments inside the rollup config files to help you do this.

Note that due to the build process involved, it can take around 20 seconds to build the initial bundle. Times will vary based on CPU and local drive speeds. The development config does not minify the code in order to save build time, but it does generate source maps. If you do not require these, disable them in the config to speed it up further.
