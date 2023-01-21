import {Component, OnInit} from '@angular/core';

import {ServersService} from '../servers.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})

export class ServerComponent implements OnInit {
  server: { id: number, name: string, status: string } = {id: 0, name: "", status: ""};

  constructor(private serversService: ServersService, private activatedRoute: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    // const id: number = Number(this.activatedRoute.snapshot.params['id'])
    // const returnedServer = this.serversService.getServer(id);
    //
    // if(returnedServer !== undefined){
    //   this.server = returnedServer
    // }
    //
    // this.activatedRoute.params.subscribe((params) => {
    //   const returnedServer = this.serversService.getServer(Number(params['id']));
    //
    //   if(returnedServer !== undefined){
    //     this.server = returnedServer;
    //   }
    // })

    this.activatedRoute.data.subscribe((data) => {
      this.server = data['resolver']
    });
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute, queryParamsHandling: 'preserve'}) // make sure the query params are kept upon navigation
  }

}
