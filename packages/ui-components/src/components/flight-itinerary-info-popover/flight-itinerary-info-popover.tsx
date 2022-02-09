import arrow from "@popperjs/core/lib/modifiers/arrow";
import flip from "@popperjs/core/lib/modifiers/flip";
import offset from "@popperjs/core/lib/modifiers/offset";
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow";
import { createPopper } from "@popperjs/core/lib/popper-lite";
import { Component, Element, Prop, h, Listen, Method } from "@stencil/core";

import type { Instance, Placement } from "@popperjs/core";

@Component({
  tag: "onc-flight-itinerary-info-popover",
  styleUrl: "flight-itinerary-info-popover.css",
  shadow: false,
})
export class FlightItineraryInfoPopover {
  //#region Props

  /**
   * Oncarbon ID for the flight itinerary whose info is to be shown
   */
  @Prop() itineraryOncarbonId: string;

  /**
   * Optional trigger element that opens the popup and in reference
   * to which the popover is positioned. Can either be a
   * 1. a DOM selector string, such as .trigger-button
   * 2. a HTML element
   *
   * If none is given, the popover is triggered and positioned by
   * the first child of this component.
   */
  @Prop() trigger?: string | HTMLElement;

  /**
   * Describes the preferred placement of the popover.
   * See https://popper.js.org/docs/v2/constructors/#placement
   *
   * @default bottom
   */
  @Prop() placement?: Placement = "bottom";

  /**
   * The offset lets you displace the popover element from its
   * reference element.
   * See https://popper.js.org/docs/v2/modifiers/offset/#options
   *
   * @default [0, 10]
   */
  @Prop() offset?: [number, number] = [0, 10];

  /**
   * Optional RFC 5646 language tag in which the info is shown. Supported
   * languages are english and finnish. If an unsupported language tag is
   * given, english is used as a fallback.
   */
  @Prop() language? = "en";

  /**
   * Oncarbon API base URL where the info is loaded from
   */
  @Prop() apiBaseUrl?: string;

  //#endregion Props

  @Element() el: HTMLElement;

  private triggerEl: Element;
  private popperInstance: Instance;
  private popoverContentEl: HTMLElement;
  private popoverEl: HTMLElement;
  private observer: MutationObserver;
  /**
   * Is the popover currently open or closed
   */
  private isVisible = false;

  @Listen("click", {
    // Use body instead of window as the click event handler's target,
    // because on ios safari the events are not fired on window but on
    // body they work.
    target: "body",
  })
  onClick(e: MouseEvent) {
    this.triggerEl = this.getTriggerElement();
    if (this.triggerEl && this.triggerEl.contains(e.target as Node)) {
      this.isVisible ? this.close() : this.open();
    } else if (this.popoverContentEl && !this.popoverContentEl.contains(e.target as Node)) {
      this.close();
    }
  }

  /**
   * Opens the popover
   */
  @Method()
  async open() {
    this.isVisible = true;

    this.positionAfterCreation();
    this.createAndAddPopoverIntoDom();
    this.positionPopover();
  }

  /**
   * Closes the popover
   */
  @Method()
  async close() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
    if (this.popoverEl) {
      document.body.removeChild(this.popoverEl);
      this.popoverEl = null;
    }
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    this.popoverContentEl = null;
    this.isVisible = false;
  }

  render() {
    return <slot />;
  }

  private createAndAddPopoverIntoDom() {
    this.popoverEl = document.createElement("div");
    this.popoverEl.classList.add("onc-popover-overlay");

    const content = this.createPopoverContentEl();
    this.popoverEl.appendChild(content);

    document.body.appendChild(this.popoverEl);
  }

  private createPopoverContentEl() {
    this.popoverContentEl = document.createElement("div");
    this.popoverContentEl.classList.add("onc-popover-content-container");

    const arrow = document.createElement("div");
    arrow.classList.add("onc-popover-arrow");
    arrow.setAttribute("data-popper-arrow", "");

    const content = document.createElement("onc-flight-itinerary-info", {
      is: "onc-flight-itinerary-info",
    }) as any;
    content.classList.add("onc-popover-content");
    content.apiBaseUrl = this.apiBaseUrl;
    content.itineraryOncarbonId = this.itineraryOncarbonId;
    content.language = this.language;

    content.addEventListener("loadingReady", () => this.reposition());
    content.addEventListener("closeClicked", () => this.close());

    this.popoverContentEl.appendChild(arrow);
    this.popoverContentEl.appendChild(content);

    return this.popoverContentEl;
  }

  private getTriggerElement() {
    if (typeof this.trigger === "string") {
      return document.querySelector(this.trigger);
    } else if (this.trigger instanceof window.Element) {
      return this.trigger;
    }

    // No trigger defined, use either first child element,
    // previous sibling or finally parent element
    const firstChild = this.el.children.item(0);

    return firstChild ?? this.el.previousElementSibling ?? this.el.parentElement;
  }

  private positionPopover() {
    if (!this.popperInstance && this.usePopper()) {
      this.popperInstance = createPopper(this.triggerEl, this.popoverContentEl, {
        placement: this.placement ?? "bottom",
        modifiers: [
          flip,
          preventOverflow,
          {
            ...offset,
            options: {
              ...offset.options,
              offset: this.offset,
            },
          },
          arrow,
        ],
      });
    }
  }

  private positionAfterCreation() {
    // When the popover is initially created and positioned, it might
    // not be fully rendered, meaning its size might not be known.
    // This means that the popper instance might not be able to
    // measure and calculate the correct position. We use here
    // either mutation observer or setTimeout to wait until the
    // popover is fully rendered and then reposition it.

    if (MutationObserver && !this.observer) {
      this.observer = new MutationObserver(() => {
        if (document.contains(this.popoverEl)) {
          this.observer.disconnect();
          this.reposition();
        }
      });

      this.observer.observe(document.body, {
        attributes: false,
        childList: true,
        characterData: false,
        subtree: true,
      });
    } else {
      this.repositionIn(50);
      this.repositionIn(100);
      this.repositionIn(200);
      this.repositionIn(300);
      this.repositionIn(400);
    }
  }

  private repositionIn(ms: number) {
    setTimeout(() => this.reposition(), ms);
  }

  private reposition() {
    if (this.popperInstance) {
      this.popperInstance.update();
    }
  }

  private usePopper() {
    return window.innerWidth >= 768;
  }
}
