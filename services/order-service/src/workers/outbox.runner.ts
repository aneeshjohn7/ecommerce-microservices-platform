import { processOutboxEvents } from "./outbox.worker";

export function startOutboxWorker() {
  async function run() {
    while (true) {
      try {
        await processOutboxEvents();
      } catch (error) {
        console.error("Outbox worker failed:", error);
      }

      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }

  void run();
}