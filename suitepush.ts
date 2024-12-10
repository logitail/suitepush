#!/usr/bin/env deno run --allow-read --allow-net --allow-write

// Import necessary modules
import { Command } from "@cliffy/command";
import { Confirm, Input } from "jsr:@cliffy/prompt@^1.0.0-rc.7"; //Checkbox,Number, prompt,Confirm,
import { cyan } from "@std/fmt/colors";
import { existsSync } from "@std/fs";
import { basename, extname, join } from "@std/path"; // For handling file paths
import { mr, rl, sl } from "./utils/xml/xml-templates.ts"; // sl, ue, cs,

// Function to fetch version from deno.json
// async function getVersion(): Promise<string> {
//   const configPath = "./deno.json"; // Use relative path
//   const config = await Deno.readTextFile(configPath);
//   const parsedConfig = JSON.parse(config);
//   return parsedConfig.version || "unknown";
// }

// // Get the version dynamically
// const version = await getVersion();

// console.log(Deno.cwd());

const getErrorMessage = (error: unknown): string => {
  let message: string;
  if (error instanceof Error) {
    return error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    return message = String(error.message);
  } else if (typeof error === "string") {
    return message = error;
  } else {
    message = "Something went wrong";
    return message;
  }
};
// Function to check SDF folder structure
function checkSdfFolderStructure() {
  const suiteConfigPath = `${Deno.cwd()}/suitecloud.config.js`;
  if (!existsSync(suiteConfigPath)) {
    console.warn(
      `Warning: The current directory (${Deno.cwd()}) does not appear to be an SDF folder structure. Some operations may not work as expected.`,
    );
    Deno.exit(1);
  }
  // else {
  //   console.log(`SDF folder structure detected at: ${suiteConfigPath}`);
  // }
}

async function xmlcreation(template: string, scriptname: string) {
  const srcPath = join("src", "Objects");
  // check if subfolder 'deploy' exist if not create folder

  const deployPath = srcPath; //join(srcPath, "deploy");

  // Create the "deploy" subfolder in the "src/Objects" folder
  await Deno.mkdir(deployPath, { recursive: true });

  // Generate a file in the "deploy" subfolder
  let scriptName = scriptname; // if fileName has space turn into underscores
  scriptName = scriptName.replace(/ /g, "_");
  const filename = `customscript_${scriptName}.xml`;
  // const fileContent = 'This file was deployed using Node.js fs module.';

  // Write the XML template to the file in the "deploy" folder
  const filePath = join(deployPath, filename);
  await Deno.writeTextFile(filePath, template);

  console.log(`The file "${filename}" was created in ${deployPath}`);
}

// Function to recursively get available scripts in the SuiteScripts folder
async function getAvailableScripts(folderPath: string): Promise<string[]> {
  const scripts: string[] = [];

  if (!existsSync(folderPath)) {
    console.warn(`Warning: The folder ${folderPath} does not exist.`);
    return scripts;
  }

  for await (const dirEntry of Deno.readDir(folderPath)) {
    const entryPath = `${folderPath}/${dirEntry.name}`;
    if (
      dirEntry.isFile &&
      (dirEntry.name.endsWith(".js") || dirEntry.name.endsWith(".ts"))
    ) {
      scripts.push(entryPath);
    } else if (dirEntry.isDirectory) {
      // Recurse into subdirectories
      const nestedScripts = await getAvailableScripts(entryPath);
      scripts.push(...nestedScripts);
    }
  }

  return scripts;
}

// Function to validate if the contents of the file have the required SuiteScript type notation
async function validateSuiteScriptType(filePath: string) {
  try {
    const fileContent = await Deno.readTextFile(filePath);

    // Regex for @NScriptType
    const scriptTypeRegex = /@NScriptType\s+(\w+)/;
    const scriptTypeMatch = fileContent.match(scriptTypeRegex);

    // Regex for @description
    const descriptionRegex = /(?<=@description\s)((.|\n)*?)(?=\n\s*\*\/)/;
    const descriptionMatch = fileContent.match(descriptionRegex);

    if (scriptTypeMatch && scriptTypeMatch[1]) {
      const scriptType = scriptTypeMatch[1];
      let description = descriptionMatch ? descriptionMatch[1] : null;

      if (description) {
        // Step 3: Ask the user if they want to use the found description or create a new one
        // Show only the first 30 characters of the description, followed by '...'
        const preview = description.length > 30
          ? `${description.slice(0, 40)}...`
          : description;

        const useExistingDescription = await Confirm.prompt({
          message:
            `A description was found: "${preview}". Do you want to use it?`,
        });

        if (!useExistingDescription) {
          // Prompt the user to create a new description
          description = await Input.prompt({
            message: "Provide a new description for the script:",
          });
        }
      } else {
        // No description found, prompt the user to provide one
        description = await Input.prompt({
          message:
            "No description found. Please provide a description for the script:",
        });
      }

      return { scriptType, description };
    } else {
      console.error(
        `Error: The selected file does not contain the required @NScriptType JSDoc annotation.`,
      );
      Deno.exit(1);
    }
  } catch (error: unknown) {
    console.error(`Error reading file: ${getErrorMessage(error)}`);
    Deno.exit(1);
  }
}

// // Function to handle deployment
// async function handleDeployment(scriptType: string) {
//   console.log(`Deploying SuiteScript of type: ${scriptType}`);
//   // TODO: Add XML generation logic here
//   // TODO: Integrate NetSuite deployment logic here
// }

// Display options overview and setup CLI

// const logLevelType = new EnumType(["debug", "info", "warn", "error"]);

// Commands
const createCommand = new Command()
  .name("create")
  .description("creating the xml file for deployment")
  .action(async () => {
    checkSdfFolderStructure();

    // Get available script files from the SuiteScripts folder and its subfolders
    const availableScripts = await getAvailableScripts(
      "src/FileCabinet/SuiteScripts",
    );

    if (availableScripts.length === 0) {
      console.warn(
        "No scripts found in the src/FileCabinet/SuiteScripts/ directory.",
      );
      Deno.exit(1);
    }

    // File selection prompt
    const filePath = await Input.prompt({
      message: "Select the Suitescript",
      suggestions: availableScripts,
    });
    // Validate if the file exists
    if (!existsSync(filePath)) {
      console.error(`Error: The specified file does not exist: ${filePath}`);
      Deno.exit(1);
    }
    // Extract the file name and remove the extension
    const currentFileName = basename(filePath, extname(filePath));

    // Prompt the user for script name suggestion
    const scriptName = await Input.prompt({
      message:
        `Suggested script name: ${currentFileName}. Press Enter to accept or type a new one.`,
      default: currentFileName,
    });

    // validate if the contents of the file has the jsdoc required suitescript type notation
    const { scriptType, description } = await validateSuiteScriptType(filePath);
    // console.log("🔧👩🏻‍💻 ~ .action ~ output:", output);

    // // Step 3: Prompt for script description
    // const scriptDesc = await Input.prompt({
    //   message: "Please provide a short description for the script",
    // });

    // Use the provided script name, description, and file path to fill the template
    const dateToday = new Date().toISOString().split("T")[0]; // Get today's date in 'YYYY-MM-DD' format
    const deployName = scriptName.replace(/\s/g, "_");

    // console.log(`File selected: ${filePath}`);

    // Remove the first two folders
    const updatedPath = "/" + filePath.split("/").slice(2).join("/");

    const scriptStatus = "RELEASED";

    //create switch statement
    switch (scriptType) {
      case "MapReduceScript": {
        // new prompting
        const template = mr(
          scriptName,
          description,
          currentFileName,
          updatedPath,
          deployName,
          dateToday,
        );

        xmlcreation(template, scriptName);
        break;
      }
      case "Suitelet": {
        // new prompting
        const template = sl(
          scriptName,
          description,
          currentFileName,
          updatedPath,
          deployName,
          scriptStatus,
        );

        xmlcreation(template, scriptName);
        break;
      }
      case "Restlet": {
        // new prompting
        const template = rl(
          scriptName,
          description,
          currentFileName,
          updatedPath,
          deployName,
          scriptStatus,
        );

        xmlcreation(template, scriptName);
        break;
      }
      //TODO create the rectyple list and scriptstatus
      // case "UserEventScript": {
      //   const template = ue(
      //     scriptName,
      //     description,
      //     currentFileName,
      //     updatedPath,
      //     deployName,
      //     recType,
      //     scriptStatus,
      //   );

      //   xmlcreation(template, scriptName);
      //   break;
      // }

      default:
        // code block
        console.log("No xml found for this type Suitescript");
    }
  });

// const deployCommand = new Command()
//   .name("deploy")
//   .description("Deploy a SuiteScript to NetSuite")
//   .option("-f, --file <path:string>", "Path to the SuiteScript file")
//   .action((options) => {
//     if (!options.file) {
//       console.error("Error: Please specify a file to deploy using the --file option.");
//       Deno.exit(1);
//     }
//     console.log(`Deploying SuiteScript: ${options.file}`);
//   });

// const randomCommand = new Command()
// .name("random")
// .description("some random command")
// .action(() => {
//   const _color = Input.prompt({
//     message: "Choose a color",
//     list: true,
//     info: true,
//     suggestions: [
//       "Abbey",
//       "Absolute Zero",
//       "Acadia",
//       "Acapulco",
//       "Acid Green",
//       "Aero",
//       "Aero Blue",
//       "Affair",
//       "African Violet",
//       "Air Force Blue",
//     ],
//   });
//   // console.log(color);
// });

// const fileCommand = new Command()
// .name("file")

// .description("lorem ipsum")
// .action(() => {
//   // checkSdfFolderStructure()
// });

// console.log(result);

// main
await new Command()
  .name("suitepush")
  .version("0.1.0")
  .versionOption(
    " -v, --version",
    "Print version info.",
    function (this: Command) {
      console.log("Version: %s", this.getVersion());
    },
  )
  .description(
    "A CLI tool for creating SDF objects and deploying SuiteScripts to NetSuite",
  )
  .example(
    "general use: ",
    `$suitepush [command] [option] (enter)
  ${
      cyan(
        "Please provide the path to the SuiteScript file you want to use (press 'UP' to browse, or start to type the path/filename).",
      )
    }`,
  )
  .action(() => {
    // Default action when no subcommand is provided
    console.log("Welcome to suitepush! Use --help to see available commands.");
    checkSdfFolderStructure(); // Optional: Check structure if needed by default
  })
  // .type("log-level", logLevelType)
  .command("create", createCommand)
  // .command("deploy", deployCommand)
  // .command("random", randomCommand)
  // .command("file", fileCommand)

  .option("-h, --help", "Show help information")
  .option("-v, --version", "Show the version")
  .option("-c, --config", "Manage configurations")
  .option("-s, --setup", "Setup the tool")
  .parse(Deno.args);

// END
