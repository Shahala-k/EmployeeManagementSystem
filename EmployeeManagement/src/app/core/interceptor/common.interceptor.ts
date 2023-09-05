import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable()
export class CommonInterceptor implements HttpInterceptor {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);
    console.log('Sending');
  
    const token = 'ABDFGHJKL3456FGHJfghjkertyujhbvcftyhn';
    const newRequest = request.clone({
      setHeaders: { 'Auth-header': token }
    });
    console.log(newRequest);
  
    return next.handle(newRequest).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log(event, 'Getting');
          console.log(event.body); // Log the API data in the console
        }
        return event;
      })
    );
  }
}

