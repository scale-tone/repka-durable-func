import * as df from "durable-functions"

export default df.orchestrator(function* (context) {

    const repka: any = context.df.getInput();
    // Making a snapshot of the current state for visualization purposes
    context.df.setCustomStatus(repka);

    // Reversing the Repka chain
    while (repka.left) {

        // Adding timer for more suspense
        yield context.df.createTimer(new Date(context.df.currentUtcDateTime.getTime() + 2000));

        const temp = repka.right;
        repka.right = repka.left;
        repka.left = repka.left.next;
        repka.right.next = temp;

        // Making a snapshot of the current state for visualization purposes
        context.df.setCustomStatus(repka);
    }

    return repka;
});