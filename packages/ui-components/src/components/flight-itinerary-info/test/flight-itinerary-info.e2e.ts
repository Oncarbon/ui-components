import { newE2EPage } from "@stencil/core/testing";

describe("onc-flight-itinerary-info", () => {
  it("renders empty element", async () => {
    const page = await newE2EPage();
    await page.setContent("<onc-flight-itinerary-info></onc-flight-itinerary-info>");

    const element = await page.find("onc-flight-itinerary-info");
    expect(element).toHaveClass("hydrated");
  });
});
