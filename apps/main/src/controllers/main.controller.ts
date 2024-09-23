import { Controller, Get } from '@nestjs/common';
import { MainService } from 'modules/main/main.service';

@Controller('main')
export class MainController {
  constructor(private readonly mainService: MainService) {}
  @Get('welcome')
  greetings() {
    return this.mainService.greetings();
  }
}
