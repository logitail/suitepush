# SDFSD CLI - NetSuite SuiteScript Deployer

## Overview
SDFSD is a Deno 2.0-based CLI tool designed to simplify the deployment of SuiteScripts to NetSuite environments. By bypassing the NetSuite UI, SDFSD automates the XML generation and deployment process for SuiteScript files directly to your NetSuite account. 

This tool is ideal for developers who want a streamlined approach to deploying scripts in a repeatable and efficient manner.

## Features
- **Automated Deployment:** Automatically deploy SuiteScripts without the need to interact with NetSuite's UI.
- **XML Generation:** Generates required XML objects for SuiteScripts, handling NetSuite-specific structure automatically.
- **Deployment Wizard:** A guided wizard helps users select the type of SuiteScript to deploy, allowing quick customization.

## Traditional Deployment Steps
Ordinarily, deploying a SuiteScript involves the following steps:
1. **Create the SuiteScript:** Develop and test the SuiteScript file.
2. **Upload the Script:** Manually upload the file to NetSuite's File Cabinet.
3. **Customization Setup:** Navigate to *Customization > Scripting > Scripts > New* in NetSuite.
4. **Script Naming & Deployment:** Assign a name to the script and create a script deployment record.
5. **Download Script Object:** Save or download the resulting XML object to complete deployment.

## How SDFSD CLI Streamlines the Process
With SDFSD, you can eliminate steps 2, 3, 4, and 5. Simply create your script file and run the CLI. The wizard will prompt you to select the type of SuiteScript, after which the tool handles the rest.

## Installation

1. Ensure you have **Deno 2.0** installed. To install Deno, you can use the following command:
   ```sh
   curl -fsSL https://deno.land/install.sh | sh
   ```

2. Clone the SDFSD repository or download the CLI script file.

3. Run the script in your terminal:
   ```sh
   deno run --allow-read --allow-write --allow-net <path-to-sdfsd-cli>.ts
   ```

## Usage

1. **Run the CLI Script**
   ```sh
   deno run --allow-read --allow-write --allow-net <path-to-sdfsd-cli>.ts
   ```
   
2. **Follow the Wizard**
   - The CLI will prompt you to select the type of SuiteScript you want to deploy (e.g., `User Event`, `Scheduled`, `Map/Reduce`).
   - Based on your selections, it will generate the appropriate XML object and handle deployment to your NetSuite environment.

3. **Deployment Complete**
   - Once complete, your script will be deployed without needing manual steps within NetSuite.

## Permissions
The CLI requires the following Deno permissions:
- `--allow-read` to access script files.
- `--allow-write` to create XML objects.
- `--allow-net` to communicate with the NetSuite environment.

## Prerequisites
- Deno 2.0 installed on your system.
- Sufficient permissions in your NetSuite environment to deploy SuiteScripts.

## Troubleshooting
If you encounter issues:
1. Ensure the script file is accessible and has the correct file permissions.
2. Check your network permissions and connectivity with NetSuite.

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request if you have ideas for new features or improvements.

## License
This project is licensed under the MIT License. See the `LICENSE` file for more information.

## Versioning

v0.1.1 layout requirement
- [ ] determination of current sdf folder has a suiteconfig.js file
- [ ]  

v0.1.0 setup deno and github actions for publishing
- [ ] publish with stable jsr package of cliffy '@cliffy/command'
- [x] boilerplate code