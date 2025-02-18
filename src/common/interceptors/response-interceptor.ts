import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, { dados: T; mensagem: string }> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<{ dados: T; mensagem: string }> {

    const request = context.switchToHttp().getRequest();
    const method = request.method;

    const mensagens: Record<string, string> = {
      POST: 'Tudo certo! Registro criado com sucesso!',
      PUT: 'Tudo certo! Registro alterado com sucesso!',
      PATCH: 'Tudo certo! Registro alterado com sucesso!',
      GET: 'Psiuu! Acabamos de retornar os registros para você! ;)',
      DELETE: 'Registro removido com sucesso!',
    };

    return next.handle().pipe(
      map((data) => ({
        dados: data,
        mensagem: mensagens[method],
      })),
    );
  }
}
