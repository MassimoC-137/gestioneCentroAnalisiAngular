import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule,
    NgOptimizedImage
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  homeData: any; 

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.getHomeData().subscribe((data: any) => { 
      this.homeData = data;
    });
  }
}
