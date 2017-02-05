import { Component, Input } from '@angular/core';

import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-actionbar',
  templateUrl: 'src/components/actionbar/actionbar.component.html',
})
export class ActionbarCmp {
  constructor(private playerService: PlayerService) {}

  logout() {
    this.playerService.logout();
  }
}
