
# SuitePush Project

[![Publish](https://github.com/logitail/suitepush/actions/workflows/publish.yml/badge.svg)](https://github.com/logitail/suitepush/actions/workflows/publish.yml) ![GitHub Tag](https://img.shields.io/github/v/tag/logitail/suitepush?label=Version&link=https%3A%2F%2Fgithub.com%2Flogitail%2Fsuitepush%2F)


## Overview
SuitePush is a Deno-based tool designed for generating and managing NetSuite script deployment XML files.
It leverages the power of Deno's modern ecosystem, along with user-defined templates, to streamline development for NetSuite scripts like MapReduce, Client Scripts, User Event Scripts, Suitelets, and more.

## Features
- Supports various NetSuite script types:
  - **Client Scripts**
  - **MapReduce Scripts**
  - **User Event Scripts**
  - **Restlets**
  - **Suitelets**
  - **Scheduled Scripts**
- Modular and extensible templates with the `xml-templates.ts` file.
- Built using TypeScript for type safety and modern JavaScript features.
- Easy to extend for custom user inputs or additional functionality.

## Files
### 1. `suitepush.ts`
This is the main entry point for the project. It handles the logic for generating deployment XML files and integrates with the templates provided in `xml-templates.ts`.

Key highlights from `suitepush.ts`:
```typescript
#!/usr/bin/env deno run --allow-read --allow-net --allow-write

// Import necessary modules
import { Command } from "@cliffy/command";
import {
  Checkbox,
  Confirm,
  Input,
  Number,
  prompt,
} from "jsr:@cliffy/prompt@^1.0.0-rc.7";
import { cyan } from "@std/fmt/colors";
import { existsSync } from "https://deno.land/std@0.224.0/fs/mod.ts";
import {
  basename,
  extname,
  join,
} from "https://deno.land/std@0.224.0/path/mod.ts"; // For handling file paths
import { cs, mr, rl, sl, ue } from  // Show the first 500 characters as a preview
...
```

### 2. `xml-templates.ts`
This file contains modular templates for various NetSuite script types. You can use these templates directly or customize them for your specific requirements.

Key highlights from `xml-templates.ts`:
```typescript
// xml-templates.ts
export function cs(
  scriptName: string,
  scriptDesc: string,
  fileName: string,
  filePath: string,
  deployName: string,
  recType: string,
  scriptStatus: string
): string {
  return `<clientscript scriptid="customscript_${scriptName}">
  <description>${scriptDesc}</description>
  <isinactive>F</isinactive>
  <name>${fileName}</name>
  <notifyadmins>F</notifyadmins>
  <notifyemails></notifyemails>
  <notifyowner>F</notifyowner>
  <notifyuser>F</notifyuser>
  <scriptfile  // Show the first 500 characters as a preview
...
```

## Getting Started
### Prerequisites
- Install Deno: [Deno Installation Guide](https://deno.land/manual@v1.36.0/getting_started/installation)
- Grant file system permissions when running the scripts:
  ```bash
  deno run --allow-read --allow-write suitepush.ts
  ```

### Usage
1. Clone this repository:
   ```bash
   git clone <repository_url>
   cd suitepush
   ```

2. Run the main script to generate XML files:
   ```bash
   deno run --allow-read --allow-write suitepush.ts
   ```

3. Customize the templates by editing `xml-templates.ts`.

## Version

v0.1.3 refactored code base and script type added 
- [x] Scheduled script type added
- [x] compiled
- [x] refactored the code to be more modular
- [x] deleted older version files

v0.1.2 Script types added 
- [x] added restlet, suitelet, userevent, clientscript scripttype
- [x] when the script has a description use to in the (deployment) object
  
v0.1.0
- [x] add MapReduce as the first SuiteScript type


## Contributing
Feel free to fork this repository, add new features, or improve existing functionality. Contributions are always welcome!

## License
This project is licensed under the MIT License.
