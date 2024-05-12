import { Injectable } from '@angular/core';
import {SerializedRouterStateSnapshot} from "@ngrx/router-store";

@Injectable({
  providedIn: 'any'
})
export class UtilsService {

  getAllRouteParameters(snapshot: SerializedRouterStateSnapshot) {
    let route = snapshot.root;
    let params = new Map(Object.keys(route.params).map(key => [key, route.params[key]]));
    while (route.firstChild) {
      route = route.firstChild;
      Object.keys(route.params).forEach(key => params.set(key, route.params[key]));
    }
    return params;
  }
}
