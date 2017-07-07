import { Provider } from '@angular/core';

import { ExperimentModuleConfig } from './experiment';

export interface ABTestingModuleConfig {
    strategy?: Provider;
    experiments: ExperimentModuleConfig[];
}