import { generateEvent, Storage, Context } from '@massalabs/massa-as-sdk';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param _ - not used
 */
export function constructor(_: StaticArray<u8>): void {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!Context.isDeployingContract()) {
    return;
  }

  // Set the greeting message in the contract storage
  Storage.set('greeting', 'Hello, World!');

  // Emit an event to notify that the greeting message has been set
  generateEvent(`Greeting has been set`);

  return;
}
