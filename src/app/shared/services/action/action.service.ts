import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IActionRequest, IActionResponse } from '../../interfaces/action/action.interface';

@Injectable({
  providedIn: 'root'
})
export class ActionService {

  private url = environment.BACKEND_URL;
  private api = { categories: `${this.url}/actions` };

  constructor(private http: HttpClient) { }

  getAll(): Observable<IActionResponse[]> {
    return this.http.get<IActionResponse[]>(this.api.categories)
  }

  create(category: IActionRequest): Observable<IActionResponse> {
    return this.http.post<IActionResponse>(this.api.categories, category);
  }

  update (category: IActionRequest, id: number): Observable<IActionResponse> {
    return this.http.patch<IActionResponse>(`${this.api.categories}/${id}`, category);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.categories}/${id}`);
  }
}
