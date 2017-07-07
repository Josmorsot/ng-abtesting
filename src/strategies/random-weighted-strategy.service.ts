import { Injectable,Inject } from '@angular/core';

import { ABTestingSelectionStrategy } from '../declarations/strategy';
import { ExperimentModel, EXPERIMENTS } from '../models/experiment.model';

@Injectable()
export class RandomWeightedStrategy implements ABTestingSelectionStrategy{
    constructor(@Inject(EXPERIMENTS) private experiments:ExperimentModel[]){}
    selectVersionDisplayed(experimentName:string):string{
        let experiment = this.experiments.find(e => {
            return e.experimentName == experimentName;
        });
        if(!experiment){
            throw Error(`${experimentName} are not registered`)
        }
        return this.weightedRandom(experiment.versions);
    }

    private weightedRandom(weights):string{
        let sum = 0;
        let r = Math.random()*100;

        for(let i in weights){
            sum += weights[i];
            if(r <= sum) return i;
        }
    }
}