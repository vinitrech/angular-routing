import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {ServersService} from "../servers.service";

interface Server {
  id: number;
  name: string;
  status: string
}

@Injectable()
export class ServerResolver implements Resolve<Server> {

  constructor(private serversService: ServersService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server {
    const server = this.serversService.getServer(Number(route.params['id']));

    if (server !== undefined) {
      return server;
    } else {
      return {
        id: 0,
        name: "string",
        status: "string"
      }
    }
  }
}
