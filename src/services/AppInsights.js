import { ApplicationInsights } from '@microsoft/applicationinsights-web';

const connectionString = `InstrumentationKey=38a57ef0-6f19-41e8-9b92-e598226f8f38;IngestionEndpoint=https://westus2-2.in.applicationinsights.azure.com/`;

const appInsights = new ApplicationInsights({
  config: {
    connectionString,
  },
});

export { appInsights };
