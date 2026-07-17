import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from '../guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportDto } from './dtos/report.dto';
import { ReportsService } from './reports.service';

@Controller('reports')
@Serialize(ReportDto)
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Post('')
  @UseGuards(AuthGuard)
  createReport(@CurrentUser() user: User, @Body() body: CreateReportDto) {
    return this.reportsService.create(body, user);
  }
}
