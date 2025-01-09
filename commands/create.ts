// commands/create.ts
import { Command } from "@cliffy/command";
import { Confirm, Input } from "jsr:@cliffy/prompt@^1.0.0-rc.7"; //Checkbox, Number, prompt, Confirm,
import { existsSync } from "@std/fs";
import { basename, extname, join } from "@std/path"; // For handling file paths
// import { cs, mr, rl, sl, ss, ue } from "./utils/xml/xml-templates.ts";
import { cs, mr, rl, sl, ss, ue } from "../utils/xml/xml-templates.ts";
import recordslist from "../utils/recordslist.json" with { type: "json" };
import { checkSdfFolderStructure } from "../utils/functions.ts";

// Function to recursively get available scripts in the SuiteScripts folder
export async function getAvailableScripts(
  folderPath: string,
): Promise<string[]> {
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
    const descriptionRegex = /@description\s+(.+?)(?=\n|$)/;
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

export const createCommand = new Command()
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
      message:
        "Select the Suitescript (Use arrow key ↑ or type to search starting from the root)",
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

    // Record type is mandatory for specific script types
    let recType: string | null = null;
    if (scriptType === "UserEventScript" || scriptType === "ClientScript") {
      recType = await Input.prompt({
        message: "Select the record",
        suggestions: recordslist.records,
      });

      // Ensure recType is not null or undefined
      if (!recType) {
        console.error("Record type is required for this script type.");
        Deno.exit(1);
      }
    }

    // Example usage
    // const scriptType = "ue"; // Modify as needed

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
      case "UserEventScript": {
        const template = ue(
          scriptName,
          description,
          currentFileName,
          updatedPath,
          deployName,
          recType as string,
          scriptStatus,
        );

        xmlcreation(template, scriptName);
        break;
      }
      case "ClientScript": {
        const template = cs(
          scriptName,
          description,
          currentFileName,
          updatedPath,
          deployName,
          recType as string,
          scriptStatus,
        );

        xmlcreation(template, scriptName);
        break;
      }

      case "ScheduledScript": {
        const template = ss(
          scriptName,
          description,
          currentFileName,
          updatedPath,
          deployName,
        );

        xmlcreation(template, scriptName);
        break;
      }

      default:
        // code block
        console.log("No xml found for this type Suitescript");
    }
  });
