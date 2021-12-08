import { newSpecPage } from "@stencil/core/testing";

import { FlightItineraryInfo } from "../flight-itinerary-info";

describe("onc-flight-itinerary-info", () => {
  it("renders empty element if itinerary id is not given", async () => {
    const page = await newSpecPage({
      components: [FlightItineraryInfo],
      html: `<onc-flight-itinerary-info></onc-flight-itinerary-info>`,
    });

    expect(page.root).toEqualHtml(`
      <onc-flight-itinerary-info>
        <mock:shadow-root></mock:shadow-root>
      </onc-flight-itinerary-info>
    `);
  });

  it("renders the full component when itinerary id is given", async () => {
    const page = await newSpecPage({
      components: [FlightItineraryInfo],
      html: `<onc-flight-itinerary-info itinerary-oncarbon-id="dummyid"></onc-flight-itinerary-info>`,
    });

    expect(page.root).toEqualHtml(`
      <onc-flight-itinerary-info itinerary-oncarbon-id="dummyid">
        <mock:shadow-root>
          <iframe frameborder="0" src="https://api.oncarbon.app/v1/flights/flight-itineraries/embed/dummyid?lang=en" style="height: 360px;"></iframe>
        </mock:shadow-root>
      </onc-flight-itinerary-info>
    `);
  });

  it("renders the full component when itinerary id and language are given", async () => {
    const page = await newSpecPage({
      components: [FlightItineraryInfo],
      html: `<onc-flight-itinerary-info itinerary-oncarbon-id="dummyid" language="fi"></onc-flight-itinerary-info>`,
    });

    expect(page.root).toEqualHtml(`
      <onc-flight-itinerary-info itinerary-oncarbon-id="dummyid" language="fi">
        <mock:shadow-root>
          <iframe frameborder="0" src="https://api.oncarbon.app/v1/flights/flight-itineraries/embed/dummyid?lang=fi" style="height: 360px;"></iframe>
        </mock:shadow-root>
      </onc-flight-itinerary-info>
    `);
  });
});
