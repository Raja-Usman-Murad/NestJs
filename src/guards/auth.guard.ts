import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { createDecipheriv } from 'crypto';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    // Call the parent class's canActivate method to handle JWT validation
    const canActivate = (await super.canActivate(context)) as boolean;

    if (!canActivate) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.userId) {
      console.log('No user found on request');
      return false;
    }

    try {
      const algorithm = 'aes-256-cbc';
      const initVector = process.env.INIT_VECTOR_CRYPTO;
      const Securitykey = process.env.SECURITY_KEY_CRYPTO;
      const decipher = createDecipheriv(algorithm, Securitykey, initVector);
      let decryptedObj = decipher.update(user.userId, 'hex', 'utf-8');
      decryptedObj += decipher.final('utf8');
      const userObj = JSON.parse(decryptedObj);
      request.user.userId = userObj?.id;
      return true;
    } catch (error) {
      console.log('Error decrypting user data:', error);
      return false;
    }
  }
}
