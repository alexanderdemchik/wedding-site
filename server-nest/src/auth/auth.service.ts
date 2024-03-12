import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  public auth(body: AuthDto) {
    if (body.password !== process.env.AUTH_TOKEN) {
      throw new UnauthorizedException('');
    }
  }
}
