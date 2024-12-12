import { Component } from '@angular/core';
import { ModuleCardComponent } from '../../shared/module-card/module-card.component';
import { TopNabvbarComponent } from "../../shared/top-nabvbar/top-nabvbar.component";
import { BottomNabvbarComponent } from "../../shared/bottom-nabvbar/bottom-nabvbar.component";

@Component({
  selector: 'app-home-modules',
  imports: [ModuleCardComponent, TopNabvbarComponent, BottomNabvbarComponent],
  templateUrl: './home-modules.component.html',
  styleUrl: './home-modules.component.scss'
})
export class HomeModulesComponent {


}
