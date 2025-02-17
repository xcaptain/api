// Copyright 2017-2021 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { SignOptions } from '@polkadot/keyring/types';
import type { CodecRegistry } from '@polkadot/types-codec/types';
import type { IKeyringPair } from '../types';

// a helper function for both types of payloads, Raw and metadata-known
export function sign (registry: CodecRegistry, signerPair: IKeyringPair, u8a: Uint8Array, options?: SignOptions): Uint8Array {
  const encoded = u8a.length > 256
    ? registry.hash(u8a)
    : u8a;

  return signerPair.sign(encoded, options);
}
