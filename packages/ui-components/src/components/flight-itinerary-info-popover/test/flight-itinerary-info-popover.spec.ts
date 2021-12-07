import { newSpecPage } from "@stencil/core/testing";

import { FlightItineraryInfoPopover } from "../flight-itinerary-info-popover";

describe("onc-flight-itinerary-info-popover", () => {
  it("renders component with content", async () => {
    const { root } = await newSpecPage({
      components: [FlightItineraryInfoPopover],
      html: `<onc-flight-itinerary-info-popover>Inner content</onc-flight-itinerary-info-popover>`,
    });
    expect(root).toEqualHtml(
      `<onc-flight-itinerary-info-popover>Inner content</onc-flight-itinerary-info-popover>`,
    );
  });
});
