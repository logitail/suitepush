#!/usr/bin/env deno run --allow-read --allow-net --allow-write

// Import necessary modules
import { Command } from "jsr:@cliffy/command@^1.0.0-rc.7";
import { existsSync } from "https://deno.land/std/fs/mod.ts";

// // Function to fetch version from deno.json
// async function getVersion(): Promise<string> {
//   const configPath = "deno.json"; // Use relative path
//   const config = await Deno.readTextFile(configPath);
//   const parsedConfig = JSON.parse(config);
//   return parsedConfig.version || "unknown";
// }

// // Get the version dynamically
// const version = await getVersion();

// Define a helper function to detect the script type
function detectScriptType(scriptContent: string): string {
  const match = scriptContent.match(/@NScriptType\s+(\w+)/);
  if (match && match[1]) {
    return match[1];
  }
  throw new Error("Script type not found in the JSDoc annotation.");
}

// // Function to check SDF folder structure
// function checkSdfFolderStructure() {
//   const suiteConfigPath = `${Deno.cwd()}/suitecloud.config.js`;
//   if (!existsSync(suiteConfigPath)) {
//     console.warn(
//       `Warning: The current directory (${Deno.cwd()}) does not appear to be an SDF folder structure. Some operations may not work as expected.`
//     );
//   } else {
//     console.log(`SDF folder structure detected at: ${suiteConfigPath}`);
//   }
// }

// // Function to handle deployment
// async function handleDeployment(scriptType: string) {
//   console.log(`Deploying SuiteScript of type: ${scriptType}`);
//   // TODO: Add XML generation logic here
//   // TODO: Integrate NetSuite deployment logic here
// }

// Display options overview and setup CLI
const suitepush = new Command()
  .name("suitepush")
  .version("0.1.1")
  // .alias("v") // Alias -v to -V
  // .versionOption(
  //   " -v, --version",
  //   "Print version info.",
  //   function (this: Command) {
  //     console.log("Version: %s", this.getVersion());
  //   },
  // )
  .description("NetSuite SuiteScript Deployer")
  .option("", "Show the CLI overview.", {
    action: () => {
      console.log(`
      SuitePush CLI - NetSuite SuiteScript Deployer
      ----------------------------------------------
      SuitePush simplifies SuiteScript deployment by automating XML generation
      and bypassing NetSuite's UI. For more details, visit the documentation.
      `);
      Deno.exit(0);
    },
  })
  .arguments("[file:string]")
  .action(async (_, file?: string) => {
    if (!file) {
      // console.log("Run with --overview to learn more, or provide a SuiteScript file.");
      return;
    }

    try {
      // Read the file
      const content = await Deno.readTextFile(file);

      // Detect the script type
      const scriptType = detectScriptType(content);
      console.log(`Detected SuiteScript type: ${scriptType}`);
    } catch (err) {
      console.error("Error:", err.message);
    }
  });

// Run the CLI
suitepush.parse(Deno.args);

  
  // .command("deploy", "Deploy a SuiteScript to NetSuite")
  // .option("-t, --type <type:string>", "Type of SuiteScript to deploy")
  // .action(({ type }) => {
  //   if (!type) {
  //     console.error("Error: You must specify a SuiteScript type using the --type option.");
  //     Deno.exit(1);
  //   }
  //   checkSdfFolderStructure();
  //   handleDeployment(type);
  // })

//   // CLI implementation
// const suitepush = new Command()
// .name("suitepush")
// .description("Analyze and deploy SuiteScripts.")
// .arguments("<file:string>")
// .action(async (_, file: string) => {
//   try {
//     // Step 1: Read the file
//     const content = await Deno.readTextFile(file);

//     // Step 2: Detect script type
//     const scriptType = detectScriptType(content);
//     console.log(`Detected SuiteScript type: ${scriptType}`);

//     // Step 3: Proceed with additional logic (e.g., XML generation)
//     console.log("Further actions can be implemented here.");
//   } catch (err) {
//     console.error("Error:", err.message);
//   }
// });

// // Run the CLI
// suitepush.parse(Deno.args);
