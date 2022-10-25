import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

/** Convert a string like "name asc, address desc" to { name: "asc", address: "desc" } */
@Injectable()
export class OptionalIntPipe implements PipeTransform {
  transform(value: string): number {
    if (value == null) return undefined;

    if (typeof +value !== 'number') {
      throw new BadRequestException('Failed skip or take.');
    }

    return +value;
  }
  catch(_) {
    throw new BadRequestException('Failed skip or take.');
  }
}
