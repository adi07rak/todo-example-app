// Based on similar module in `angular-testing-library`, but altered to support `jest`.
// https://github.com/brandonroberts/angular-testing-library/blob/master/src/service_mock.ts

import { Provider, Type } from '@angular/core';

export type Mock<T> = T & { [P in keyof T]: T[P] & jest.SpyInstance };

export function createMagicalMock<T>(type: Type<T>): Mock<T> {
  const target: any = {};

  function installProtoMethods(proto: any) {
    if (proto === null || proto === Object.prototype) {
      return;
    }

    for (const key of Object.getOwnPropertyNames(proto)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const descriptor = Object.getOwnPropertyDescriptor(proto, key)!;

      if (typeof descriptor.value === 'function' && key !== 'constructor') {
        target[key] = jest.fn();
      }
    }

    installProtoMethods(Object.getPrototypeOf(proto));
  }

  installProtoMethods(type.prototype);

  return target;
}

export function provideMagicalMock<T>(type: Type<T>): Provider {
  return {
    provide: type,
    useFactory: () => createMagicalMock(type),
  };
}
