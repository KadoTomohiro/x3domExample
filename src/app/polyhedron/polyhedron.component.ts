import {Component, Input, OnInit} from '@angular/core';
import {Color, Colors, Edges, Face, Faces, Vertex, Vertices} from '../models/geometry';

@Component({
  selector: 'app-polyhedron',
  template: `
    <!--The content below is only a placeholder and can be replaced.-->
    <x3d is="x3d" class="_12ifvmu" width="896px" height="435px">
      <scene is="x3d" render="true" bboxcenter="0,0,0" bboxsize="-1,-1,-1" pickmode="idBuf" dopickpass="true">
        <viewpoint is="x3d" position="0,0,7" fieldofview="0.785398" orientation="0,0,0,0" centerofrotation="0,0,0" znear="-1" zfar="-1">
        </viewpoint>
        <shape is="x3d" data-testid="x3d-shape" render="true" bboxcenter="0,0,0" bboxsize="-1,-1,-1" ispickable="true">
          <appearance is="x3d" sorttype="auto" alphaclipthreshold="0.1">
            <material is="x3d" transparency="0.09999999999999998" ambientintensity="0.2" diffusecolor="0.8,0.8,0.8" emissivecolor="0,0,0"
                      shininess="0.2" specularcolor="0,0,0">
            </material>
          </appearance>
          <indexedfaceset is="x3d" data-testid="x3d-faces" solid="false" colorpervertex="false"
                          [attr.coordindex]="faceIndexes"
                          ccw="true" usegeocache="true" lit="true" normalpervertex="true" normalupdatemode="fast" convex="true"
                          normalindex="" colorindex="" texcoordindex="">
            <coordinate is="x3d" data-testid="x3d-vertices" [attr.point]="vertexPoints">
            </coordinate>
            <color is="x3d"
                   [attr.color]="colorValues">
            </color>
          </indexedfaceset>
        </shape>
        <shape is="x3d" render="true" bboxcenter="0,0,0" bboxsize="-1,-1,-1" ispickable="true">
          <indexedlineset is="x3d"
                          [attr.coordindex]="edgeIndexes"
                          solid="true" ccw="true" usegeocache="true" lit="true" colorpervertex="true" colorindex="">
            <coordinate is="x3d" data-testid="x3d-vertices"
                        [attr.point]="vertexPoints">

            </coordinate>
          </indexedlineset>
        </shape>
      </scene>

    </x3d>
  `,
  styles: [
  ]
})
export class PolyhedronComponent implements OnInit {

  @Input() vertices: Vertices;
  @Input() edges: Edges;
  @Input() faces: Faces;
  @Input() colors: Color;

  vertexPoints: string;
  faceIndexes: string;
  colorValues: string;
  constructor() { }

  ngOnInit(): void {
    const newVertexes = this.vertices.concat();
    const separatedFaces: Faces = [];
    this.faces.map(face => {
      const faceVertexCount = face.length;
      const faceVertexTotal: Vertex = face.reduce((sum: Vertex, vertexIndex: number) => {
        return sum.map((s, i) => s + this.vertices[vertexIndex][i]) as Vertex;
      }, [0, 0, 0]);
      const faceCenter: Vertex =
        [faceVertexTotal[0] / faceVertexCount, faceVertexTotal[1] / faceVertexCount, faceVertexTotal[2] / faceVertexCount];
      const centerIndex = newVertexes.push(faceCenter) - 1;
      return face.map((vertexIndex: number, index: number, faceArray: Face) => {
        const nextIndex = index + 1 === faceArray.length ? 0 : index + 1;
        return [vertexIndex, faceArray[nextIndex], centerIndex];
      }).forEach((separatedFace: Face) => separatedFaces.push(separatedFace));
    });
    this.vertexPoints = this.convertVertexPoints(newVertexes);

    this.faceIndexes = separatedFaces.map(face => face.join(' ')).join(' -1 ');

    this.colorValues = this.convertColorValues(separatedFaces.map(() => this.colors.concat()));
  }

  convertVertexPoints(vertexes: Vertices): string {
    return vertexes.map(face => face.join(' ')).join(',');
  }

  get edgeIndexes(): string {
    return this.edges.map(edge => edge.join(' ')).join(' -1 ');
  }

  convertColorValues(colors: Colors): string{
    return colors.map(face => face.join(' ')).join(',');
  }

}
