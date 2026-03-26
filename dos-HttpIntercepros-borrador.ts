import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("******** AUTH INTERCEPTOR ACTIVADO **********")
  const router = inject(Router)

  const API1 = "http://url1.com";
  const API2 = "http://url2.com";

  let peticion = req;

  if(req.url.startsWith(API1)){
    const token1 = localStorage.getItem("access_token1");

    peticion = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token1}`
      }
    });
  }

  if(req.url.startsWith(API2)){
    peticion = req.clone({
      setHeaders: {
        'api-key': `123456879`
      }
    });
  }

  return next(peticion).pipe(tap(() => {},
      (error: any) => {
        if(error instanceof HttpErrorResponse){
          if(error.status !== 401){
            return;
          }
          localStorage.removeItem("access_token");
          
          router.navigate(["/auth/login"]);
        }
      }
    ));
};
