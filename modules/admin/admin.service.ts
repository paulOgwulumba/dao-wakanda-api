import { Injectable } from '@nestjs/common';

@Injectable()
export class AdminService {
  greetings() {
    return "Hi I'm Jarvis";
  }
}
