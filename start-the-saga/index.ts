import * as df from "durable-functions"
import { Context } from "@azure/functions"

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

    return { body: "The saga of Repka has (re)started" };
};

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