import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-polyhedron
      [vertices]="verticesData"
      [edges]="edgesData"
      [faces]="facesData"
      [colors]="colorData"></app-polyhedron>

    <app-polyhedron
      [vertices]="verticesData"
      [edges]="starEdgesData"
      [faces]="starFacesData"
      [colors]="colorData"></app-polyhedron>
    <router-outlet></router-outlet>
  `,
  styles: [],
})
export class AppComponent {
  title = 'x3domExample';

  au = (1 + Math.sqrt(5)) / 2;
  powAu = Math.pow(this.au, 2);

  verticesData = [
    [-1, this.powAu, 0], [1, this.powAu, 0], [-1, -this.powAu, 0], [1, -this.powAu, 0],
    [-this.powAu, 0, -1], [-this.powAu, 0, 1], [this.powAu, 0, -1], [this.powAu, 0, 1],
    [0, 1, -this.powAu], [0, -1, -this.powAu], [0, 1, this.powAu], [0, -1, this.powAu],
    [-this.au, this.au, -this.au], [-this.au, -this.au, -this.au], [this.au, this.au, -this.au], [this.au, -this.au, -this.au],
    [-this.au, this.au, this.au], [-this.au, -this.au, this.au], [this.au, -this.au, this.au], [this.au, this.au, this.au]
  ];

  facesData = [
    [0, 1, 19, 10, 16], [1, 14, 6, 7, 19], [6, 15, 3, 18, 7],
    [3, 2, 17, 11, 18], [17, 5, 16, 10, 11], [19, 7, 18, 11, 10],
    [14, 8, 9, 15, 6], [1, 0, 12, 8, 14], [0, 16, 5, 4, 12],
    [4, 5, 17, 2, 13], [9, 13, 2, 3, 15], [8, 12, 4, 13, 9]
  ];
  edgesData = [
    [0, 1], [0, 12], [0, 16], [1, 14], [1, 19],
    [2, 3], [2, 13], [2, 17], [3, 15], [3, 18],
    [4, 5], [4, 12], [4, 13], [5, 16], [5, 17],
    [6, 7], [6, 14], [6, 15], [7, 18], [7, 19],
    [8, 9], [8, 12], [8, 14], [9, 13], [9, 15],
    [10, 11], [10, 16], [10, 19], [11, 17], [11, 18]
  ];

  colorData = [0.21568627450980393, 0.49411764705882355, 0.7215686274509804]


    starFacesData = [
      [0, 2, 19, 4, 18], [1, 17, 6, 16, 3], [0, 18, 8, 10, 15],
      [16, 6, 4, 19, 9], [1, 17, 8, 10, 13], [5, 7, 12, 11, 14],
      [5, 7, 13, 10, 15], [2, 19, 9, 11, 14], [1, 13, 7, 12, 3],
      [0, 2, 14, 5, 15], [16, 3, 12, 11, 9], [8, 17, 6, 4, 18]
    ];
    starEdgesData = [
      [0, 2], [0, 15], [0, 18], [1, 3], [1, 13],
      [1, 17], [2, 14], [2, 19], [3, 12], [3, 16],
      [4, 6], [4, 18], [4, 19], [5, 7], [5, 14],
      [5, 15], [6, 16], [6, 17], [7, 12], [7, 13],
      [8, 10], [8, 17], [8, 18], [9, 11], [9, 16],
      [9, 19], [10, 13], [10, 15], [11, 12], [11, 14]
      // [0, 2], [2, 19], [19, 4], [4, 18], [18, 0],
      // [1, 3], [3, 16], [16, 6], [6, 17], [17, 1],
      // [4, 5], [4, 12], [4, 13], [5, 16], [5, 17],
      // [6, 7], [6, 14], [6, 15], [7, 18], [7, 19],
      // [8, 9], [8, 12], [8, 14], [9, 13], [9, 15],
      // [10, 11], [10, 16], [10, 19], [11, 17], [11, 18]
    ];
}
