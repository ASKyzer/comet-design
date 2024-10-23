# Comet Design System

Comet Design System is a UI framework that provides consistent components for building web applications. It extends Vaadin components and includes custom-built elements.

## Quick Start

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Setup

1. Clone the repository:

   ```
   git clone https://github.com/ASKyzer/comet-design.git
   ```

2. Navigate to the project directory:

   ```
   cd comet-design
   ```

3. Install dependencies:

   ```
   npm install
   ```

### Building the Library

To build the library:

```
npm run build
```

### Testing Locally in Other Projects

To test the library locally in React, Angular, or other frameworks:

1. After building, create a tarball:

   ```
   npm pack --pack-destination ~
   ```

   This will produce a file named `frigi-comet-[version].tgz`. This version number will be the same as the one in the `package.json` file.

2. In your destination project's `package.json`, add the following dependency:

   ```json
   {
     "dependencies": {
       "@frigi/comet": "file:~/frigi-comet-[version].tgz"
     }
   }
   ```

   Replace `[version]` with the actual version number (e.g., 0.9.0).

3. Run `npm install` in your destination project to install the local package.

4. Follow the instructions in the destination project on how to use the components. In an Angular project for example, you can use the components by adding in main.ts:

   ```typescript
   import "@frigi/comet/dist/comet.js";
   ```

   and in the or `angular.json` file, add the following:

   ```json
   "projects": {
    "project-name": {
      "architect": {
        "build": {
          "options": {
            "styles": ["node_modules/@frigi/comet/dist assets/nest.css"]
          }
        }
      }
    }
   }
   ```

5. Other frameworks will require different setup. Check the documentation of the framework you are using.

## Usage

Import and use Comet components in your project:

For Angular for example: add a schema: [CUSTOM_ELEMENTS_SCHEMA] in the module.

```typescript
<comet-component></comet-component>
```

## License

Comet Design System is licensed under the MIT License.
