# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0

## Getting TypeScript
Add Typescript to project `npm`.
```
npm install -D typescript
```

# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```

- Run the project on dev enviroment
```
npm run dev

```


- Build the project
```
npm run build
```

- Run the project on compile TS
```
npm run start
```

  Navigate to `http://localhost:3000`

- API Document endpoints

  Locations GET : http://localhost:3000/api/locations 
  Locations POST : http://localhost:3000/api/locations 
  Locations PATCH : http://localhost:3000/api/locations 
  Locations DELETE : http://localhost:3000/api/locations 



# TypeScript + Node 
The main purpose of this repository is to show a project setup and workflow for a Nodejs+Express+Typescrit REST API.



## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from your TypeScript build.  						   |
| **node_modules**         | Contains all  npm dependencies                                                                |
| **src**                  | Contains  source code that will be compiled to the dist dir                               	   |
| **src/controllers**      | Controllers define functions to serve various express routes.                                 |
| **src/interfaces**       | Define interfaces for Mongoose to map the models.                                             |
| **src/config**           | Config files for exported for the .env                                                        |
| **src/routes**           | Contain all express routes, separated by module/area of application                           |
| **src/models**           | Models define schemas used in storing and retrieving data from Application database           |
| **src**/app.ts           | Entry point to express app                                                                    |
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   
| tsconfig.json            | Config settings for compiling source code only written in TypeScript                          |

## Building the project
### Configuring TypeScript compilation
```json
{
    "compilerOptions": {
		"target": "es6",
		"module": "commonjs",
		"outDir": "./dist",
		"rootDir": "./src",
		"strict": true,
		"moduleResolution": "node",
		"esModuleInterop": true,
		"skipLibCheck": true,
		"forceConsistentCasingInFileNames": true
    },
    
  }

```

### Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `start`                   | Runs full build and runs node on dist/app.js. Can be invoked with `npm run start`                 |
| `build:live`              | Full build. Runs ALL build tasks                                                                  |
| `dev`                     | Runs app using the code in app.ts . Can be invoked with `npm run dev`                             |