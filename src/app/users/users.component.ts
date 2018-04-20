import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: User[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAccessToken()
      .subscribe(data => {
        this.getUsers(data.access_token)
      });
  }

  getUsers(accessToken: string) {
    this.userService.getUsers(accessToken)
      .subscribe(users => this.setUsers(users));
  }

  setUsers(users) {
    let data = users.data;
    const transformedUsers = data.map(user => {
      return new User(
        user.id,
        user.attributes.name,
        user.attributes.username,
        user.attributes.email,
        user.attributes.status,
        user.attributes.createdAt,
        user.attributes.updatedAt
      );
    });
    
    this.users = transformedUsers;
  }

}
