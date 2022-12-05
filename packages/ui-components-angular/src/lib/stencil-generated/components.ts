/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components } from '@oncarbon/ui-components/components';

import { defineCustomElement as defineOncFlightItineraryInfo } from '@oncarbon/ui-components/components/onc-flight-itinerary-info.js';
import { defineCustomElement as defineOncFlightItineraryInfoPopover } from '@oncarbon/ui-components/components/onc-flight-itinerary-info-popover.js';


export declare interface OncFlightItineraryInfo extends Components.OncFlightItineraryInfo {
  /**
   * Event emitted when the flight itinerary info has been loaded 
   */
  loadingReady: EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted when the close icon has been clicked 
   */
  closeClicked: EventEmitter<CustomEvent<void>>;

}

@ProxyCmp({
  defineCustomElementFn: defineOncFlightItineraryInfo,
  inputs: ['apiBaseUrl', 'itineraryOncarbonId', 'language', 'version']
})
@Component({
  selector: 'onc-flight-itinerary-info',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['apiBaseUrl', 'itineraryOncarbonId', 'language', 'version']
})
export class OncFlightItineraryInfo {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['loadingReady', 'closeClicked']);
  }
}


export declare interface OncFlightItineraryInfoPopover extends Components.OncFlightItineraryInfoPopover {}

@ProxyCmp({
  defineCustomElementFn: defineOncFlightItineraryInfoPopover,
  inputs: ['apiBaseUrl', 'disableCloseOnOutsideClick', 'itineraryOncarbonId', 'language', 'offset', 'placement', 'trigger', 'version'],
  methods: ['open', 'close']
})
@Component({
  selector: 'onc-flight-itinerary-info-popover',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  inputs: ['apiBaseUrl', 'disableCloseOnOutsideClick', 'itineraryOncarbonId', 'language', 'offset', 'placement', 'trigger', 'version']
})
export class OncFlightItineraryInfoPopover {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
