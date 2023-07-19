import { Ingerdient } from "../shared/ingerdients.model";

export class Recipe {
    public name : string;
    public description : string;
    public imagePath : string;
    public ingerdient : Ingerdient[];

    constructor(name : string, desc : string, imgPath : string, ingerdient: Ingerdient[]) {
       
        this.name = name;
        this.description = desc;
        this.imagePath = imgPath;
        this.ingerdient = ingerdient;
    }
}