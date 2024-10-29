const ue = `<usereventscript scriptid="customscript${scriptName}">
  <description></description>
  <isinactive>F</isinactive>
  <name>${fileName}</name>
  <notifyadmins>F</notifyadmins>
  <notifyemails></notifyemails>
  <notifyowner>F</notifyowner>
  <notifyuser>F</notifyuser>
  <scriptfile>[${filePath}]</scriptfile>
  <scriptdeployments>
    <scriptdeployment scriptid="customdeploy${deployName}">
      <allemployees>F</allemployees>
      <alllocalizationcontexts>T</alllocalizationcontexts>
      <allpartners>F</allpartners>
      <allroles>T</allroles>
      <audslctrole></audslctrole>
      <eventtype></eventtype>
      <executioncontext>ACTION|ADVANCEDREVREC|BANKCONNECTIVITY|BANKSTATEMENTPARSER|BUNDLEINSTALLATION|CLIENT|CONSOLRATEADJUSTOR|CSVIMPORT|CUSTOMGLLINES|CUSTOMMASSUPDATE|DATASETBUILDER|DEBUGGER|EMAILCAPTURE|FICONNECTIVITY|FIPARSER|MAPREDUCE|OCRPLUGIN|OTHER|PAYMENTGATEWAY|PAYMENTPOSTBACK|PLATFORMEXTENSION|PORTLET|PROMOTIONS|RECORDACTION|RESTLET|RESTWEBSERVICES|SCHEDULED|SDFINSTALLATION|SHIPPINGPARTNERS|SUITELET|TAXCALCULATION|USEREVENT|USERINTERFACE|WEBSERVICES|WORKBOOKBUILDER|WORKFLOW</executioncontext>
      <isdeployed>T</isdeployed>
      <loglevel>DEBUG</loglevel>
      <recordtype>${recType}</recordtype>
      <runasrole>ADMINISTRATOR</runasrole>
      <status>${scriptStatus}</status>
    </scriptdeployment>
  </scriptdeployments>
</usereventscript>`;