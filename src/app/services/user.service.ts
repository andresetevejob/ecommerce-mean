import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiUrl} from '../../environments/environment';
import {BehaviorSubject, Observable, of, Subject} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {JwtResponse} from '../response/jwt.response';
import {CookieService} from 'ngx-cookie-service';
import {User} from "../models/User";
/**
 *  Testing service  : https://blog.thoughtram.io/angular/2016/11/28/testing-services-with-http-in-angular-2.html
 *  Angular Test : https://angular.io/guide/testing#setup
 *  https://blog.soat.fr/2018/02/tests-unitaires-avec-angular-partie-1/
 *  https://itnext.io/clean-code-checklist-in-angular-%EF%B8%8F-10d4db877f74
 *  Google search : behaviorsubject angular 7
 *  https://www.akveo.com/blog/top-7-nicely-looking-free-open-source-angular-projects/
 *  https://medium.com/@thegiraffeclub/angular-clean-architecture-approach-fcfe32e983a5
 *  https://www.tutorialsteacher.com/typescript/typescript-overview
 *  asObservable in Subject : https://stackoverflow.com/questions/36986548/when-to-use-asobservable-in-rxjs
 *  
 * 
 * 
 */

@Injectable({
    providedIn:'root'
})
export class UserService{

    private currentUserSubject:BehaviorSubject<JwtResponse>;
    public currentUser: Observable<JwtResponse>;
    public nameTerms = new Subject<string>();
    public name$ = this.nameTerms.asObservable();
    public foo='bar';

    constructor(private http:HttpClient,private cookieService:CookieService){
       const memo = localStorage.getItem("currentUser");
       this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(memo));
       this.currentUser = this.currentUserSubject.asObservable();
       cookieService.set('currentUser',memo); 
    }

    public login(loginForm):Observable<JwtResponse>{
        const url = `${apiUrl}/login`;
        return this.http.post<JwtResponse>(url,loginForm).pipe(
            tap(user=>{
                if(user && user.token){
                    this.cookieService.set('currentUSer',JSON.stringify(user));
                    if(loginForm.remembered){
                        localStorage.setItem('currentUser',JSON.stringify(user));
                    }
                    console.log((user.name));
                    this.nameTerms.next(user.name);
                    this.currentUserSubject.next(user);
                }
            }),
            catchError(this.handleError('Login Failed', null))
        )
    }

    get currentUserValue(){
        return this.currentUserSubject.value;
    }

    public logout(){
        this.currentUserSubject.next(null);
        localStorage.removeItem('currentUser');
        this.cookieService.delete('currentUser');
    }

    public signUp(user: User): Observable<User> {
        const url = `${apiUrl}/register`;
        return this.http.post<User>(url, user);
    }

    public update(user: User): Observable<User> {
        const url = `${apiUrl}/profile`;
        return this.http.put<User>(url, user);    }

    public get(email: string): Observable<User> {
        const url = `${apiUrl}/profile/${email}`;
        return this.http.get<User>(url);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            console.log(error); // log to console instead

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}