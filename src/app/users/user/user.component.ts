import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number, name: string } = {id: 0, name: ""};
  paramsSubscription: Subscription = new Subscription();

  constructor(private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.user = {
      id: this.activeRoute.snapshot.params['id'],
      name: this.activeRoute.snapshot.params['name']
    }

    this.paramsSubscription = this.activeRoute.params.subscribe(
      (params) => {
        this.user.id = params['id']
        this.user.name = params['name']
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe(); // angular will do this automatically for default observables, but for custom ones it's needed to add this unsubscribe manually
  }
}
