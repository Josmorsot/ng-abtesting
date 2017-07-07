export const EXPERIMENTS:any = '';

export class ExperimentModel{
    experimentName: string;
    versions: any;

    constructor(name:string, versions:any){
        this.experimentName = name;
        this.versions = versions;
    }
}