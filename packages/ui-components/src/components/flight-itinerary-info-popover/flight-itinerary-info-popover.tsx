import arrow from "@popperjs/core/lib/modifiers/arrow";
import flip from "@popperjs/core/lib/modifiers/flip";
import offset from "@popperjs/core/lib/modifiers/offset";
import preventOverflow from "@popperjs/core/lib/modifiers/preventOverflow";
import { createPopper } from "@popperjs/core/lib/popper-lite";
import { Component, Element, Prop, h, State, Listen, Method } from "@stencil/core";

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
  private popoverEl: HTMLElement;

  /**
   * Is the popover content shown. The content is first rendered
   * as hidden, then it is positioned using popper and displayed.
   * Otherwise the layout will flicker because the popover content
   * will take space until it is positioned.
   */
  @State() showContent = false;

  /**
   * Is the popover currently open or closed
   */
  @State() isVisible = false;

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
    } else if (this.popoverEl && !this.popoverEl.contains(e.target as Node)) {
      this.close();
    }
  }

  @Listen("closeClicked")
  onCloseClicked() {
    this.close();
  }

  @Listen("loadingReady")
  onItineraryInfoLoaded() {
    if (this.popperInstance) this.popperInstance.update();
  }

  componentDidRender() {
    if (!this.isVisible) return;

    if (!this.popperInstance && this.usePopper()) {
      this.popperInstance = createPopper(this.triggerEl, this.popoverEl, {
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

    // When the popover is shown, we first render it so that it is hidden
    // to prevent layout from flickering when popper takes over and positions
    // it with position absolute. Hence after the first render we show the
    // the content.
    if (!this.showContent) {
      this.showContent = true;
    }

    if (this.popperInstance) {
      this.popperInstance.update();
    }
  }

  /**
   * Opens the popover
   */
  @Method()
  async open() {
    this.isVisible = true;
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
    this.popoverEl = null;
    this.showContent = false;
    this.isVisible = false;
  }

  render() {
    if (!this.isVisible) {
      return <slot />;
    }

    return [
      <slot />,
      <div
        ref={(el) => (this.popoverEl = el)}
        class="popover-content-container"
        style={{
          ...(!this.showContent && { display: "none" }),
        }}
      >
        <div class="popover-arrow" data-popper-arrow />
        <onc-flight-itinerary-info
          class="popover-content"
          apiBaseUrl={this.apiBaseUrl}
          itineraryOncarbonId={this.itineraryOncarbonId}
          language={this.language}
        ></onc-flight-itinerary-info>
      </div>,
    ];
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

  private usePopper() {
    return window.innerWidth >= 768;
  }
}
