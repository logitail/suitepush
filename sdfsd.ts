// import necessary Deno modules and any helper libraries
//TODO once stable package is release update this link to jsr
// import { Command } from "jsr:@cliffy/command";
import { Command } from "https://deno.land/x/cliffy@v0.20.1/command/mod.ts";
// import templates from './utils/xml/xml-templates.js';
import pkgdetails from "./deno.json" with { type: "json" };


// Initialize CLI
const cli = new Command()
  .name("sdfsd")
  .version(pkgdetails.version)
  .description("CLI for deploying SuiteScripts to NetSuite")
  
  .action(
     () => {
   

    console.log("Welcome to SDFSD - NetSuite SuiteScript Deployer");

    // 1. list the suitescript in the feature folder

    // 2. select the suitescript -> based on the jsdoc determin the type

    }
  );

// // Automated deployment command
// cli.command("deploy", "Deploy a SuiteScript to NetSuite")
//   .option("-f, --file <path:string>", "Path to the SuiteScript file")
//   .option("-e, --env <environment:string>", "Target NetSuite environment")
//   .action(async (options) => {
//     const { file, env } = options;
//     console.log(`Deploying ${file} to environment: ${env}`);
//     // Placeholder: Here, add the deployment logic
//     await deployScript(file, env);
//   });

// XML generation command
cli.command("create", "Generate XML for SuiteScript")
  .option("-o, --output <output:string>", "Output directory for XML")
  .action(async (options) => {
    try {
      await Deno.stat("suiteconfig.js");
      console.log("suiteconfig.js exists.");
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        console.log("suiteconfig.js does not exist.");
      } else {
        console.error("An error occurred:", error);
      }
    }
    const { output } = options;
    console.log(`Generating XML in directory: ${output}`);
    // Placeholder: Insert XML generation logic here
    await generateXml(output);
  });

// // Deployment wizard
// cli.command("wizard", "Interactive wizard for SuiteScript deployment")
//   .action(async () => {
//     console.log("Starting deployment wizard...");
//     // Placeholder: Insert interactive wizard logic here
//     await runWizard();
//   });

// Execute CLI
cli.parse(Deno.args);

// // Mock functions (To be implemented )
// async function deployScript(file: string, env: string) {
//   console.log(`Deploying ${file} to ${env} (This is a mock function).`);
// }

async function generateXml(output: string) {
  console.log(`Generating XML at ${output} (This is a mock function).`);

  await Promise.resolve(); // Placeholder for future async logic
}

// async function runWizard() {
//   console.log("Running wizard (This is a mock function).");
// }
