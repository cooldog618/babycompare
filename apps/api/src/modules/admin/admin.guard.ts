import { CanActivate, ExecutionContext, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const expected = process.env.ADMIN_API_TOKEN;
    if (!expected) throw new InternalServerErrorException('admin token is not configured');
    const token = context.switchToHttp().getRequest().headers['x-admin-token'];
    if (token !== expected) throw new UnauthorizedException('unauthorized');
    return true;
  }
}
