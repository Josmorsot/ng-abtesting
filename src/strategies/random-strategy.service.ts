import { Injectable,Inject } from '@angular/core';

import { ABTestingSelectionStrategy } from '../declarations/strategy';
import { ExperimentModel, EXPERIMENTS } from '../models/experiment.model';


@Injectable()
export class RandomStrategy implements ABTestingSelectionStrategy{
    constructor(@Inject(EXPERIMENTS) private experiments:ExperimentModel[]){}
    selectVersionDisplayed(experimentName:string):string{
        let experiment = this.experiments.find(e => {
            return e.experimentName == experimentName;
        });
        if(!experiment){
            throw Error(`${experimentName} are not registered`);
        }
        let randomVersion = this.pickRandomVersion(experiment.versions);
        return  randomVersion;
    }

    private pickRandomVersion(versions) {
        var result;
        var count = 0;
        for (var v in versions)
            if (Math.random() < 1/++count)
                result = v;
        return result;
    }
}