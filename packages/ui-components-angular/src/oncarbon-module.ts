import { NgModule } from "@angular/core";

import {
  OncFlightItineraryInfo,
  OncFlightItineraryInfoPopover,
} from "./lib/stencil-generated/components";

@NgModule({
  declarations: [OncFlightItineraryInfo, OncFlightItineraryInfoPopover],
  exports: [OncFlightItineraryInfo, OncFlightItineraryInfoPopover],
})
export class OncarbonModule {}
