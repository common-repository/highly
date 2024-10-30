import { DeusExTooltip } from "./tooltip.js";
import { decodeHighlights } from "./utils.js";

let highlyTooltipOpen = false;
var MachinaExTooltip = DeusExTooltip(document, "");
decodeHighlights();

// some more complex init logic
// Choice 1: Function to generate social media buttons, and set them as innerHTML
// Choise 2: Pre-render the tooltip using php. <- this could be interesting
let highly_available_articles = document.getElementsByTagName("ARTICLE");

function highlyTooltipSelectedText() {
  if (window.getSelection) {
    return window.getSelection();
  } else if (document.selection) {
    return document.getSelection();
  }
  return null;
}

if (highly_available_articles.length > 0 && !!highly_available_articles[0]) {
  var MachinaExTooltip = DeusExTooltip(document, "");
  const element = highly_available_articles[0];
  window.addEventListener(
    "mousedown",
    (e) => {
      MachinaExTooltip.destroyTooltip(e);
      highlyTooltipOpen = false;
    },
    false
  );
  element.addEventListener(
    "mouseup",
    (e) => {
      const selection = highlyTooltipSelectedText();
      if (!selection || !selection.toString().trim().length) {
        highlyTooltipOpen = false;
        return;
      }
      console.log(selection.toString());
      MachinaExTooltip.createTooltip(selection, element);
      highlyTooltipOpen = true;
    },
    false
  );
}
