import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserMusic } from '../model/user-music.model';
import { UserSinger } from '../model/user-singer.model';
import { UserPet } from '../model/user-pet.model';
import { UserLanguage } from '../model/user-language.model';
import { UserHobby } from '../model/user-hobby.model';
import { UserExpecting } from '../model/user-expecting.model';
import { UserExercise } from '../model/user-exercise.model';
import { Status } from '../model/status.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  form: FormGroup;
  config = 'http://localhost:2203/api';
  modelName= 'user';
  constructor(private httpClient: HttpClient,private authService: AuthService) { }

  mapModel(model: any): User {
    return new User(model);
  }

  mapBanModel(res: any): void {
    return res;
  }

  mapNotificationModel(model: any): Notification {
    return new Notification(model);
  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  findAll(populate: string[] | null = null): Observable<User[]> {
    let url = `${this.config}/${this.modelName}`;

    if (populate) {
      url += `?populate=${populate.join(', ')}`;
    }

    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return this.mapListToModelList(res);
        }
      })
    );
  }

  findById(id: number, populate: string[] | null = null): Observable<User> {
    let url = `${this.config}/${this.modelName}/${id}`;

    if (populate) {
      url += `?populate=${populate.join(', ')}`;
    }

    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return this.mapModel(res);
        }
      })
    );
  }

  upsert(id: number, model: User): Observable<User> {
    const url = `${this.config}/${this.modelName}/${id}`;
    return this.httpClient.put(url, JSON.stringify(model), { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return this.mapModel(res);
        }
      })
    );
  }

  ban(id: number, model: User): Observable<User> {
    const url = `${this.config}/${this.modelName}/${id}`;
    return this.httpClient.put(url, JSON.stringify(model), { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return this.mapModel(res);
        }
      })
    );
  }
  

  // ban(userId: number, adminId: number): Observable<void> {
  //   const url = `${this.config}/banned`;
  //   const body = { userId, adminId };

  //   return this.httpClient.post(url, body, { headers: this.getHeaders() }).pipe(
  //     map((res: any) => {
  //       // Assuming you want to do some mapping here, modify as needed
  //       return this.mapBanModel(res);
  //     }),
  //     catchError(error => {
  //       throw new Error(error);
  //     })
  //   );
  // }

  create(model: User): Observable<User> {
    const url = `${this.config}/${this.modelName}`;
    return this.httpClient.post(url, JSON.stringify(model), { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return this.mapModel(res);
        }
      })
    );
  }

  createNotification(model: Notification): Observable<Notification> {
    const url = `${this.config}/notification`;
    return this.httpClient.post(url, JSON.stringify(model), { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          return this.mapNotificationModel(res);
        }
      })
    );
  }
  
  deleteById(id: number): Observable<void> {
    const url = `${this.config}/${this.modelName}/${id}`;
    return this.httpClient.delete(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res && res.error) {
          throw new Error(res.error);
        }
      })
    );
  }

  private mapListToModelList(list: Array<Object>): User[] {
    return list.map((item) => this.mapModel(item));
  }

  
  // private handleError(error: HttpErrorResponse): Observable<Family> {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     console.error(`Backend returned code ${error.status}, body was:`, error.error);
  //   }
  //   return throwError('Something bad happened; please try again later.');
  // }

  findMusicById(id: number, populate: string[] | null = null): Observable<UserMusic[]> {
    let url = `${this.config}/userMusic/music/${id}`;
  
    if (populate) {
      url += `?populate=${populate.join(', ')}`;
    }
  
    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          // Assuming res is an array of UserMusic objects
          return res.map((userMusic: any) => this.mapMusicModel(userMusic));
        }
      })
    );
  }
  

  mapMusicModel(model: any): UserMusic {
    return new UserMusic(model); // Adjust this based on your Music model constructor
  }

  // Singer
  findSingerById(id: number, populate: string[] | null = null): Observable<UserSinger[]> {
    let url = `${this.config}/userSinger/singer/${id}`;
  
    if (populate) {
      url += `?populate=${populate.join(', ')}`;
    }
  
    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          // Assuming res is an array of UserMusic objects
          return res.map((userSinger: any) => this.mapSingerModel(userSinger));
        }
      })
    );
  }
  

  mapSingerModel(model: any): UserSinger {
    return new UserSinger(model); // Adjust this based on your Music model constructor
  }

  //Pet
  findPetById(id: number, populate: string[] | null = null): Observable<UserPet[]> {
    let url = `${this.config}/userPet/pet/${id}`;
  
    if (populate) {
      url += `?populate=${populate.join(', ')}`;
    }
  
    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          // Assuming res is an array of UserMusic objects
          return res.map((userPet: any) => this.mapPetModel(userPet));
        }
      })
    );
  }
  

  mapPetModel(model: any): UserPet {
    return new UserPet(model); // Adjust this based on your Music model constructor
  }

  //Language
  findLanguageById(id: number, populate: string[] | null = null): Observable<UserLanguage[]> {
    let url = `${this.config}/userLanguage/language/${id}`;
  
    if (populate) {
      url += `?populate=${populate.join(', ')}`;
    }
  
    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          // Assuming res is an array of UserMusic objects
          return res.map((userLanguage: any) => this.mapLanguageModel(userLanguage));
        }
      })
    );
  }
  

  mapLanguageModel(model: any): UserLanguage {
    return new UserLanguage(model); // Adjust this based on your Language model constructor
  }

  //Hobby
  findHobbyById(id: number, populate: string[] | null = null): Observable<UserHobby[]> {
    let url = `${this.config}/userHobby/hobby/${id}`;
  
    if (populate) {
      url += `?populate=${populate.join(', ')}`;
    }
  
    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          // Assuming res is an array of UserMusic objects
          return res.map((userHobby: any) => this.mapHobbyModel(userHobby));
        }
      })
    );
  }
  

  mapHobbyModel(model: any): UserHobby {
    return new UserHobby(model); // Adjust this based on your Language model constructor
  }

  //Expecting
  findExpectingById(id: number, populate: string[] | null = null): Observable<UserExpecting[]> {
    let url = `${this.config}/userExpecting/expecting/${id}`;
  
    if (populate) {
      url += `?populate=${populate.join(', ')}`;
    }
  
    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          // Assuming res is an array of UserMusic objects
          return res.map((userExpecting: any) => this.mapExpectingModel(userExpecting));
        }
      })
    );
  }
  

  mapExpectingModel(model: any): UserExpecting {
    return new UserExpecting(model); // Adjust this based on your Language model constructor
  }

   //Exercise
   findExerciseById(id: number, populate: string[] | null = null): Observable<UserExercise[]> {
    let url = `${this.config}/userExercise/exercise/${id}`;
  
    if (populate) {
      url += `?populate=${populate.join(', ')}`;
    }
  
    return this.httpClient.get(url, { headers: this.getHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.error);
        } else {
          // Assuming res is an array of UserMusic objects
          return res.map((UserExercise: any) => this.mapExerciseModel(UserExercise));
        }
      })
    );
  }
  

  mapExerciseModel(model: any): UserExercise {
    return new UserExercise(model); // Adjust this based on your Language model constructor
  }

}
