import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {}
  title = 'Hvis du klikker her genereres en ny tekst fra et array i en Azure function';

  changeText() {
    this.http.get<string>('api/HttpTriggerCSharp')
      .toPromise()
      .then(x => {
        console.log("response from function", x);
        this.title = x;
      });
  }
}
