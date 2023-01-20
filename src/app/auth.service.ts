export class AuthService {
  loggedIn: boolean = false;

  isAuthenticated() {
    return new Promise<boolean>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn)
      }, 1000);
    });
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
