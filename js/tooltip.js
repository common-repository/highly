import socialElements from "./widgets/social.js";
import widgets from "./widgets/stateful.js";

import {
  TOOLTIP_WIDTH,
  TOOLTIP_HEIGHT,
  PADDING,
  TOOLTIP_GENERAL_CLASSNAME,
  LEFT_POINTER_CLASS,
  RIGHT_POINTER_CLASS,
  CENTER_POINTER_CLASS,
  TOOLTIP_TOP_CLASSNAME,
  TOOLTIP_BOTTOM_CLASSNAME,
  BUFFER,
} from "./constants.js";

import {
  getIndicesOf,
  getSelectionCharOffsetsWithin,
  isHighlyElement,
} from "./utils.js";

/**
 * Adjusting the Absolute Unit
 */

function AbsoluteUnitAdjust() {
  if (!window.getSelection) return;
  let text = window.getSelection().toString();
  if (text === "") return;

  let rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
  let top = rect.top;
  let bottom = window.innerHeight - top;

  let tooltip = document.getElementsByClassName(TOOLTIP_GENERAL_CLASSNAME)[0];
  if (!tooltip) return;

  if (top >= TOOLTIP_HEIGHT + BUFFER) {
    if (tooltip.classList.contains(TOOLTIP_BOTTOM_CLASSNAME)) {
      tooltip.classList.remove(TOOLTIP_BOTTOM_CLASSNAME);
      tooltip.classList.add(TOOLTIP_TOP_CLASSNAME);
    }
  } else {
    if (tooltip.classList.contains(TOOLTIP_TOP_CLASSNAME)) {
      tooltip.classList.remove(TOOLTIP_TOP_CLASSNAME);
      tooltip.classList.add(TOOLTIP_BOTTOM_CLASSNAME);
    }
  }
  tooltip.style.top =
    (top >= TOOLTIP_HEIGHT + BUFFER
      ? rect.top - TOOLTIP_HEIGHT + PADDING
      : rect.bottom + PADDING) +
    window.pageYOffset +
    "px";
}

/**
 * This Tooltip is an Absolute Unit!
 *
 * Behold the Powah of Absolute Position
 *
 * @param tooltip - tooltip element
 * @param selection - text selection
 */
function AbsoluteUnit(tooltip, selection, element) {
  tooltip.setAttribute("data-text", selection.toString());

  saveOccurenceIndex(tooltip, element);

  let rect = window.getSelection().getRangeAt(0).getBoundingClientRect();
  let top = rect.top;
  let bottom = window.innerHeight - top;

  let distanceLeft = rect.left;
  let distanceRight = window.innerWidth - rect.width - distanceLeft;
  let halfWidth = TOOLTIP_WIDTH / 2;

  tooltip.className =
    top >= TOOLTIP_HEIGHT + BUFFER
      ? TOOLTIP_TOP_CLASSNAME
      : TOOLTIP_BOTTOM_CLASSNAME;
  tooltip.classList.add(TOOLTIP_GENERAL_CLASSNAME);

  if (halfWidth > distanceLeft) {
    tooltip.style.left = rect.left + (rect.right - rect.left) / 2 + "px";
    tooltip.classList.add(LEFT_POINTER_CLASS);
  } else if (halfWidth > distanceRight) {
    tooltip.style.left =
      rect.left + (rect.right - rect.left) / 2 - TOOLTIP_WIDTH + "px";
    tooltip.classList.add(RIGHT_POINTER_CLASS);
  } else {
    tooltip.style.left =
      rect.left + (rect.right - rect.left) / 2 - TOOLTIP_WIDTH / 2 + "px";
    tooltip.classList.add(CENTER_POINTER_CLASS);
  }

  tooltip.style.top =
    (top >= TOOLTIP_HEIGHT + BUFFER
      ? rect.top - TOOLTIP_HEIGHT + PADDING
      : rect.bottom + PADDING) +
    window.pageYOffset +
    "px";

  window.addEventListener("scroll", AbsoluteUnitAdjust);

  return tooltip;
}

/**
 * Saves occurence index of text for later use
 *
 * @param tooltip - tooltip element
 */
function saveOccurenceIndex(tooltip, element) {
  console.log(element);
  if (!window.getSelection) return;
  if (window.getSelection().toString() === "") return;
  let fragment = window.getSelection().getRangeAt(0).cloneContents();
  let text = fragment.textContent;

  if (text === "") return;

  let occurrences = getIndicesOf(text, element.textContent, false);
  let ends = getSelectionCharOffsetsWithin(element);
  let occurenceIndex = occurrences.indexOf(ends.start);

  tooltip.setAttribute("data-occurence", occurenceIndex);
  console.log(tooltip);
}

/**
 * Mugatu is the King of Style, or at least pretends to be
 *
 *
 * For now we ignore settings
 *
 * @param settings from wordpress
 */
function Mugatu(settings) {
  return (tooltip) => {
    console.log(tooltip);
    //Add social media buttons
    addElements(tooltip, widgets);
    addElements(tooltip, socialElements);
    return tooltip;
  };
}

function addElements(tooltip, elements, negativeActionType) {
  elements.forEach((element) => {
    let icon = document.createElement("div");

    if (element.negativeType && element.negativeType === negativeActionType) {
      icon.innerHTML = element.negativeHtml;
      icon.children[0].onclick = () => element.negativeAction(tooltip);
    } else {
      icon.innerHTML = element.html;
      icon.children[0].onclick = () => element.action(tooltip);
    }
    icon.className = element.classname;
    tooltip.appendChild(icon);
  });
}

/**
 * The Tooltip God.
 *
 * He Creates and He Destroys. He Gives Form To All (with Style)
 *
 * Have some func!
 */
export function DeusExTooltip(document, settings) {
  return {
    tooltip: Mugatu(settings)(document.createElement("div")),
    createTooltip(selection, element) {
      if (!this.tooltip) {
        this.tooltip = Mugatu(settings)(document.createElement("div"));
      }
      document.body.appendChild(AbsoluteUnit(this.tooltip, selection, element));
    },
    destroyTooltip(e) {
      let element = e ? e.target || e.toElement : null;
      if (element && isHighlyElement(element)) {
        e.preventDefault();
        return;
      }
      window.removeEventListener("scroll", AbsoluteUnitAdjust);
      let tooltip = document.getElementsByClassName("highly-tooltip")[0];
      if (tooltip) {
        tooltip.parentElement.removeChild(tooltip);
      }
    },
  };
}

export { addElements, AbsoluteUnitAdjust };
