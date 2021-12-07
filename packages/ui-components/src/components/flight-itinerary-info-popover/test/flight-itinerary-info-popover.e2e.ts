import { newE2EPage } from "@stencil/core/testing";

describe("onc-flight-itinerary-info-popover", () => {
  it("renders", async () => {
    const page = await newE2EPage();

    await page.setContent(
      "<onc-flight-itinerary-info-popover></onc-flight-itinerary-info-popover>",
    );
    const element = await page.find("onc-flight-itinerary-info-popover");
    expect(element).toHaveClass("hydrated");
  });
});
