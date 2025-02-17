// Copyright 2017-2021 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { CodecTo } from '@polkadot/types-codec/types';

import { TypeRegistry } from '@polkadot/types';
import { CodecMap, Text, U32 } from '@polkadot/types-codec';

const registry = new TypeRegistry();
const mockU32TextMap = new Map<Text, U32>();

mockU32TextMap.set(new Text(registry, 'bazzing'), new U32(registry, 69));

const mockU32TextMapString = '{"bazzing":69}';
const mockU32TextMapObject = { bazzing: 69 };
const mockU32TextMapHexString = '0x041c62617a7a696e6745000000';
const mockU32TextMapUint8Array = Uint8Array.from([4, 28, 98, 97, 122, 122, 105, 110, 103, 69, 0, 0, 0]);

const mockU32U32Map = new Map<U32, U32>();

mockU32U32Map.set(new U32(registry, 1), new U32(registry, 2));
mockU32U32Map.set(new U32(registry, 23), new U32(registry, 24));
mockU32U32Map.set(new U32(registry, 28), new U32(registry, 30));
mockU32U32Map.set(new U32(registry, 45), new U32(registry, 80));

const mockU32U32MapString = '{"1":2,"23":24,"28":30,"45":80}';
const mockU32U32MapObject = { 1: 2, 23: 24, 28: 30, 45: 80 };
const mockU32U32MapHexString = '0x10043102000000083233180000000832381e00000008343550000000';
const mockU32U32MapUint8Array = Uint8Array.from([16, 4, 49, 2, 0, 0, 0, 8, 50, 51, 24, 0, 0, 0, 8, 50, 56, 30, 0, 0, 0, 8, 52, 53, 80, 0, 0, 0]);

describe('CodecMap', (): void => {
  describe('decoding', (): void => {
    const testDecode = (type: string, input: unknown, output: string): void =>
      it(`can decode from ${type}`, (): void => {
        const s = new CodecMap(registry, Text, U32, input as string);

        expect(s.toString()).toBe(output);
      });

    testDecode('map', mockU32TextMap, mockU32TextMapString);
    testDecode('hex', mockU32TextMapHexString, mockU32TextMapString);
    testDecode('Uint8Array', mockU32TextMapUint8Array, mockU32TextMapString);

    testDecode('map', mockU32U32Map, mockU32U32MapString);
    testDecode('hex', mockU32U32MapHexString, mockU32U32MapString);
    testDecode('Uint8Array', mockU32U32MapUint8Array, mockU32U32MapString);
  });

  describe('encoding', (): void => {
    const testEncode = (to: CodecTo, expected: any): void =>
      it(`can encode ${to}`, (): void => {
        const s = new CodecMap(registry, Text, U32, mockU32TextMap, 'BTreeMap');

        expect(s[to]()).toEqual(expected);
      });

    testEncode('toHex', mockU32TextMapHexString);
    testEncode('toJSON', mockU32TextMapObject);
    testEncode('toU8a', mockU32TextMapUint8Array);
    testEncode('toString', mockU32TextMapString);
  });

  describe('encoding muple values', (): void => {
    const testEncode = (to: CodecTo, expected: any): void =>
      it(`can encode ${to}`, (): void => {
        const s = new CodecMap(registry, Text, U32, mockU32U32Map, 'BTreeMap');

        expect(s[to]()).toEqual(expected);
      });

    testEncode('toHex', mockU32U32MapHexString);
    testEncode('toJSON', mockU32U32MapObject);
    testEncode('toU8a', mockU32U32MapUint8Array);
    testEncode('toString', mockU32U32MapString);
  });
});
