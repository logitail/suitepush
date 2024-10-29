const sl = `<suitelet scriptid="customscript${scriptName}">
    <description></description>
    <isinactive>F</isinactive>
    <name>${fileName}</name>
    <notifyadmins>F</notifyadmins>
    <notifyemails></notifyemails>
    <notifyowner>T</notifyowner>
    <notifyuser>F</notifyuser>
    <scriptfile>[${filePath}]</scriptfile>
    <scriptdeployments>
        <scriptdeployment scriptid="customdeploy${deployName}">
            <allemployees>F</allemployees>
            <allpartners>F</allpartners>
            <allroles>F</allroles>
            <audslctrole></audslctrole>
            <eventtype></eventtype>
            <isdeployed>T</isdeployed>
            <isonline>F</isonline>
            <loglevel>DEBUG</loglevel>
            <runasrole></runasrole>
            <status>${scriptStatus}</status>
            <title>${fileName}</title>
        </scriptdeployment>
    </scriptdeployments>
</suitelet>`;