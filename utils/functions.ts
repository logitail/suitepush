// Function to check SDF folder structure

import { existsSync } from "@std/fs";
///

export function checkSdfFolderStructure() {
  const suiteConfigPath = `${Deno.cwd()}/suitecloud.config.js`;
  if (!existsSync(suiteConfigPath)) {
    console.warn(
      `\n
      The current directory does not appear to be an SDF folder structure. Please navigate to a valid SDF folder before proceeding. \n
     (${Deno.cwd()})`,
    );
    Deno.exit(1);
  }
  // else {
  //   console.log(`SDF folder structure detected at: ${suiteConfigPath}`);
  // }
}
