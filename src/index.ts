import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoStaticServer.web.ts
// and on native platforms to ExpoStaticServer.ts
import ExpoStaticServerModule from './ExpoStaticServerModule';
import ExpoStaticServerView from './ExpoStaticServerView';
import { ChangeEventPayload, ExpoStaticServerViewProps } from './ExpoStaticServer.types';

// Get the native constant value.
export const PI = ExpoStaticServerModule.PI;

export function hello(): string {
  return ExpoStaticServerModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoStaticServerModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoStaticServerModule ?? NativeModulesProxy.ExpoStaticServer);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoStaticServerView, ExpoStaticServerViewProps, ChangeEventPayload };
