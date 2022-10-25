import {
  ArgumentMetadata,
  BadGatewayException,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

/** Convert a string like "name asc, address desc" to { name: "asc", address: "desc" } */
@Injectable()
export class OrderByPipe implements PipeTransform {
  // order=id:desc
  transform(value: string): Record<string, 'asc' | 'desc'> | undefined {
    if (value == null) return undefined;

    try {
      const queries = value.split(',').map((val) => val.trim());
      const orderBy: Record<string, 'asc' | 'desc'> = {};
      queries.forEach((query) => {
        // One query should be id:desc
        console.log(queries);
        const [key, order] = query.split(':') as [string, 'asc' | 'desc'];

        // Check we have correct values
        if (!['asc', 'desc'].includes(order.toLocaleLowerCase())) {
          throw new BadGatewayException('Failed order by');
        }

        orderBy[key] = order.toLocaleUpperCase() as 'asc' | 'desc';
      });

      return orderBy;
    } catch (_) {
      throw new BadRequestException('Failed order by');
    }
  }
}
