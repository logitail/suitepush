const cs = `<clientscript scriptid="customscript${scriptName}">
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
      <executioncontext>ACTION|ADVANCEDREVREC|BANKCONNECTIVITY|BANKSTATEMENTPARSER|BUNDLEINSTALLATION|CLIENT|CONSOLRATEADJUSTOR|CSVIMPORT|CUSTOMGLLINES|CUSTOMMASSUPDATE|DATASETBUILDER|DEBUGGER|EMAILCAPTURE|FICONNECTIVITY|FIPARSER|MAPREDUCE|OTHER|PAYMENTGATEWAY|PAYMENTPOSTBACK|PLATFORMEXTENSION|PORTLET|PROMOTIONS|RECORDACTION|RESTLET|RESTWEBSERVICES|SCHEDULED|SDFINSTALLATION|SHIPPINGPARTNERS|SUITELET|TAXCALCULATION|USEREVENT|USERINTERFACE|WEBSERVICES|WORKBOOKBUILDER|WORKFLOW</executioncontext>
      <isdeployed>T</isdeployed>
      <loglevel>ERROR</loglevel>
      <recordtype>${recordType}</recordtype>
      <status>${scriptStatus}</status>
    </scriptdeployment>
  </scriptdeployments>
</clientscript>`;