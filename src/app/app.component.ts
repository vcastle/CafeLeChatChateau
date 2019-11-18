import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CafeLeChatChateau';

  public clickedEvent: Event;

  childEventClicked(event: Event) {
    this.clickedEvent = event;
  }
}
