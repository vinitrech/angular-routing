import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Params} from "@angular/router";
import {query} from "@angular/animations";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: { id: number, name: string, status: string } = {id: 0, name: "", status: ""};
  serverName = '';
  serverStatus = '';
  allowEdit: boolean = false

  constructor(private serversService: ServersService, private activatedRoute: ActivatedRoute) {
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

    const returnedServer = this.serversService.getServer(1)
    if (returnedServer !== undefined) {
      this.server = returnedServer;
    }
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
