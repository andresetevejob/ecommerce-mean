import { TestBed } from '@angular/core/testing';
import { UserService }from './user.service';
import { User }from '../models/User';
import { HttpClientTestingModule,HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'ngx-cookie-service';
import {apiUrl} from '../../environments/environment';
/**
 * TestBed : is Angular’s primary API to configure and initialize environments for unit testing and provides methods for creating components and services in unit tests
 */

describe('UserService',()=>{
      beforeEach(()=>{
          TestBed.configureTestingModule({
             imports:[HttpClientTestingModule],
             providers:[
                 UserService,
                 CookieService
             ]
          });
      });

      it('should login the user',()=>{
          const userService = TestBed.get(UserService);
          const http = TestBed.get(HttpTestingController);
          const cookieService = TestBed.get(CookieService);
          //fake response
          const expectUser = {email:'test@test.fr',password:'string',name:'string',phone:'string',address:'string',role:'string',active: 'boolean'};
          let data ={};
          let actualUser = {};
          userService.signUp(data).subscribe((user:User)=>{
             actualUser = user;
          });
          http.expectOne(`${apiUrl}/register`).flush(expectUser);
          expect(actualUser).toEqual(expectUser);
          expect( cookieService ).toBeTruthy();
      })
})