import * as df from "durable-functions"
import { Context } from "@azure/functions"
import * as fs from 'fs';

export default async function (context: Context): Promise<any> {

    const client = df.getClient(context);

    // (re)using just one orchestration instance
    const instanceId = 'my-repka-instance';
    var repka = DefaultRepka;

    var instanceStatus: any = await client.getStatus(instanceId);
    if (!instanceStatus) {

        // Starting a new repka
        repka = DefaultRepka;

    } else if(!instanceStatus.output) {

        return {
            status: 500,
            body: 'Repka is being reversed. Please, wait.'
        };

    } else {
        // Reversing existing repka
        repka = instanceStatus.output;

        repka.left = repka.right;
        repka.right = null;
    }

    await client.startNew('the-saga-of-repka', instanceId, repka);

    // Also writing Durable Functions Monitor custom tab template code into the Blob storage
    context.bindings.customLiquidTemplate = fs.readFileSync('Repka Status.the-saga-of-repka.liquid', 'utf8');

    return { body: "The saga of Repka has (re)started" };
};

// Initial state of the linked list
const DefaultRepka = {
    right: null,
    left: {
        name: "dedka",
        next: {
            name: "babka",
            next: {
                name: "vnuchka",
                next: {
                    name: "zhuchka",
                    next: {
                        name: "koshka",
                        next: {
                            name: "myshka",
                            next: null
                        }
                    }
                }
            }
        }
    }
};
