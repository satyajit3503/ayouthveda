import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  constructor(private router:Router ){}
  ngOnInit()
  {
    const username=localStorage.getItem("username");
      
    if(username== undefined || username == null) 
    {
      this.router.navigate(['/login']);
    }

  }

}
