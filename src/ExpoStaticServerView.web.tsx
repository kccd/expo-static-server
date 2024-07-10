import * as React from 'react';

import { ExpoStaticServerViewProps } from './ExpoStaticServer.types';

export default function ExpoStaticServerView(props: ExpoStaticServerViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
