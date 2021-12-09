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

  scheme: string;
  trainNumber: string;
  date: string;

  get link(): string {
    return this.validLink ? `${this.scheme}:train?number=${this.trainNumber}&date=${this.date}` : null;
  }

  get validLink(): boolean {
    return this.scheme != null && this.trainNumber != null && this.date != null;
  }

  openLink() {
    window.open(this.link, '_system');
  }

  changeText() {
    this.http.get('api/HttpTriggerCSharp').toPromise()
      .then(x => {
        console.log("response from function", x);
        this.title = <string> x;
      })
      .catch(e => console.error(e));
  }


}
