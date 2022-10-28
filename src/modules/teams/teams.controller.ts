import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  ParseIntPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { OrderByPipe } from 'src/pipes/orderby.pipe';
import { OptionalIntPipe } from 'src/pipes/optionalInt.pipe';
import { TeamServices } from './teams.service';
import { TeamDTO } from './teams.dto';
import { TeamUpdateDTO } from './teams.update.dto';

@Controller('jams')
export class TeamsController {
  constructor(private readonly jamServices: TeamServices) {}
}
