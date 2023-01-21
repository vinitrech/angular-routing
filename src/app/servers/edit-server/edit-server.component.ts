import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {query} from "@angular/animations";
import {CanComponentDeactivate} from "./can-deactivate-guard.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
  server: { id: number, name: string, status: string } = {id: 0, name: "", status: ""};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false
  changesSaved: boolean = false

  constructor(private serversService: ServersService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.queryParams)
    console.log(this.activatedRoute.snapshot.fragment)

    this.activatedRoute.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1'
      }
    ) // getting changes dynamically
    // this.activatedRoute.fragment.subscribe() // getting changes dynamically

    const id: number = Number(this.activatedRoute.snapshot.params['id']);

    this.activatedRoute.params.subscribe((params) => {
      const returnedServer = this.serversService.getServer(Number(params['id']))

      if (returnedServer !== undefined) {
        this.server = returnedServer;
      }
    })

    const returnedServer = this.serversService.getServer(id)

    if (returnedServer !== undefined) {
      this.server = returnedServer;
    }
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.changesSaved = true;
    this.router.navigate(['/servers']);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm("Do you want to discard changes?");
    } else {
      return true;
    }
  }
}
