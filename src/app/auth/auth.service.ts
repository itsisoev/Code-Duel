import {Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {catchError, Observable, of, tap} from 'rxjs';
import {environment} from '../../environments/environment.development';
import {IAuth, IDecodedToken, IUser} from '../model/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userId = signal<string>('');
  userData = signal<IUser | null>(null);
  access_token = signal<string>('');
  isLoggedIn = signal<boolean>(false);
  readonly baseAPI = environment.baseAPI;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.checkToken();
  }

  clearToken(): void {
    this.access_token.set('');
    this.isLoggedIn.set(false);
    this.userId.set('');
    this.userData.set(null);
    sessionStorage.removeItem('access_token');
  }

  register(data: { username: string; password: string }): Observable<IAuth | null> {
    return this.http.post<IAuth>(`${this.baseAPI}users`, data).pipe(
      tap((res) => this.handleAuthentication(res)),
      catchError((err) => {
        console.error('Registration error', err);
        return of(null);
      })
    );
  }

  login(data: { username: string; password: string }): Observable<IAuth | null> {
    return this.http.post<IAuth>(`${this.baseAPI}auth/login`, data).pipe(
      tap((res) => {
        if (res && res.token) {
          sessionStorage.setItem('access_token', res.token);
          this.access_token.set(res.token);
          this.isLoggedIn.set(true);
        } else {
          console.error('No token received');
        }
      }),
      catchError((err) => {
        console.error('Login error', err);
        return of(null);
      })
    );
  }

  getUserById(userId: string): Observable<IUser | null> {
    if (!userId) {
      return of(null);
    }

    return this.http.get<IUser>(`${this.baseAPI}auth/${userId}`).pipe(
      catchError((err) => {
        console.error('Get user by ID error', err);
        return of(null);
      })
    );
  }

  private checkToken(): void {
    const token = sessionStorage.getItem('access_token');
    if (token) {
      this.access_token.set(token);
      this.validateToken();
    }
  }

  private validateToken(): void {
    const token = this.access_token();
    if (!token) {
      this.clearToken();
      return;
    }

    const isExpired = this.jwtHelper.isTokenExpired(token);
    if (!isExpired) {
      const decodedToken = this.jwtHelper.decodeToken<IDecodedToken>(token);
      this.userId.set(decodedToken?.id || '');
      this.isLoggedIn.set(true);
    } else {
      this.clearToken();
    }
  }

  private handleAuthentication(res: IAuth): void {
    if (res && res.token && res.user.id) {
      sessionStorage.setItem('access_token', res.token);
      this.access_token.set(res.token);
      this.userId.set(res.user.id);
      this.isLoggedIn.set(true);
    } else {
      this.clearToken();
      throw new Error('Invalid authentication response');
    }
  }
}
