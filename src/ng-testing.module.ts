import { NgModule,ModuleWithProviders } from '@angular/core';

import { ABTestingSelectionStrategy } from './declarations/strategy';
import { ABTestingModuleConfig } from './declarations/config';
import { RandomStrategy } from './strategies/random-strategy.service';
import { EXPERIMENTS } from './models/experiment.model';
import { ABTestingDirective } from './ng-testing.directive';

@NgModule({
    providers: [],
    declarations: [
        ABTestingDirective
    ],
    exports: [
        ABTestingDirective
    ]
})
export class ABTestingModule{
    private static parse(str:string):any {
        var decode = decodeURIComponent;
        var obj = {};
        if(str){
            var pairs = str.split(/ *; */);
            var pair;
            if ('' == pairs[0]) return obj;
            for (var i = 0; i < pairs.length; ++i) {
                pair = pairs[i].split('=');
                obj[decode(pair[0])] = decode(pair[1]);
            }
        }
        return obj;
    }
    static withConfig(config:ABTestingModuleConfig):ModuleWithProviders  {
        return {
            ngModule: ABTestingModule,
            providers: [
                config.strategy || { provide: ABTestingSelectionStrategy, useClass: RandomStrategy },
                {provide: EXPERIMENTS, useValue: config.experiments },
            ]
        }
    }
}