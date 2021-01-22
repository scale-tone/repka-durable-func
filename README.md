# The Saga of Repka

This [Azure Durable Function](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-overview?tabs=javascript) implements the algorithm of reversing a [linked list](https://en.wikipedia.org/wiki/Linked_list) in form of a [Durable Orchestration](https://docs.microsoft.com/en-us/azure/azure-functions/durable/durable-functions-orchestrations?tabs=javascript) written in TypeScript.

It does so solely for fun and demo purposes.

The sample linked list represents [The Gigantic Turnip](https://en.wikipedia.org/wiki/The_Gigantic_Turnip) Russian folktale (which not only fits well into the context, but also promotes teamwork). That list constitutes the actual state of the Durable Orchestration.

# Prerequisites
Please, have [Azure Functions Core Tools](https://www.npmjs.com/package/azure-functions-core-tools) **globally** installed on your devbox.

## How to run locally

* In the project's folder create a `local.settings.json` file, which should look like this:

```
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "your-azure-storage-connection-string",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  }
}
```

* Go to the project's folder with your command prompt and type the following:

```
npm install
npm start
```

* Navigate to http://localhost:7071/api/start-the-saga

This will create a new `RepkaHub` Task Hub and start a new instance of [the-saga-of-repka](https://github.com/scale-tone/repka-durable-func/blob/master/the-saga-of-repka/index.ts) orchestration in it. Subsequent calls to that method will recreate the same instance, causing it to reverse its linked list backwards and forwards.

Once you started an Orchestration, you can monitor its state with [Durable Functions Monitor](https://github.com/scale-tone/DurableFunctionsMonitor). This sample also includes a [custom status tab template for it](https://github.com/scale-tone/repka-durable-func/blob/master/Repka%20Status.the-saga-of-repka.liquid), which visualizes the process in a beautiful and authentic way: https://twitter.com/tino_scale_tone/status/1350936310035472386.

