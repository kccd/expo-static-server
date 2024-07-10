import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoStaticServerViewProps } from './ExpoStaticServer.types';

const NativeView: React.ComponentType<ExpoStaticServerViewProps> =
  requireNativeViewManager('ExpoStaticServer');

export default function ExpoStaticServerView(props: ExpoStaticServerViewProps) {
  return <NativeView {...props} />;
}
