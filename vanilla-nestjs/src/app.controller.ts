import { Controller, Get } from '@nestjs/common';

@Controller('/app')
class AppController {
  @Get('/abc')
  getRootRoute() {
    return 'hi there!';
  }

  @Get('/bye')
  getByeNow() {
    return 'bye bye!';
  }
}

export default AppController;
