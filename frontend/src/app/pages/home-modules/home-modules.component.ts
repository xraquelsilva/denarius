import { Component } from '@angular/core';
import { ModuleCardComponent } from '../../shared/module-card/module-card.component';

@Component({
  selector: 'app-home-modules',
  imports: [ModuleCardComponent],
  templateUrl: './home-modules.component.html',
  styleUrl: './home-modules.component.scss'
})
export class HomeModulesComponent {


}
