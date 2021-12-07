import { Event, Component, Host, h, State, Prop, Listen } from "@stencil/core";

import type { EventEmitter } from "@stencil/core";

@Component({
  tag: "onc-flight-itinerary-info",
  styleUrl: "flight-itinerary-info.css",
  shadow: true,
})
export class FlightItineraryInfo {
  //#region Properties

  /**
   * The flight itinerary's oncarbon id for which to show the info
   */
  @Prop() itineraryOncarbonId: string;

  /**
   * Optional base URL for the Oncarbon API where the info is loaded from
   */
  @Prop() apiBaseUrl = "https://api.oncarbon.app";

  //#endregion Properties

  //#region Events

  /**
   * Event emitted when the flight itinerary info has been loaded
   */
  @Event() loadingReady: EventEmitter<void>;

  /**
   * Event emitted when the close icon has been clicked
   */
  @Event() closeClicked: EventEmitter<void>;

  //#endregion Events

  /**
   * Height of the iframe element. The iframe should send a "loaded" message
   * to the window with its required height.
   */
  @State() iframeHeight = 360;

  // The itinerary info page that is loaded into the iframe sends
  // "loaded" message when it has successfully loaded and "close"
  // message when the close icon has been clicked
  @Listen("message", {
    target: "window",
  })
  onMessage(e) {
    if (typeof e.data !== "object" || typeof e.data.type !== "string") {
      return;
    }
    if (e.data.type === "loaded") {
      this.iframeHeight = e.data.height;
      this.loadingReady.emit();
    }
    if (e.data.type === "close") {
      this.closeClicked.emit();
    }
  }

  render() {
    const url = this.getItineryInfoUrl();
    if (!url) return <Host></Host>;

    return (
      <Host>
        <iframe
          style={{
            height: `${this.iframeHeight}px`,
          }}
          frameBorder="0"
          src={url}
        ></iframe>
      </Host>
    );
  }

  private getItineryInfoUrl() {
    if (!this.itineraryOncarbonId) {
      return null;
    }

    return `${this.apiBaseUrl}/v1/flights/flight-itineraries/embed/${this.itineraryOncarbonId}`;
  }
}
