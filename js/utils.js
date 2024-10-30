import {
  ID_TO_TEXT,
  INTERACTION_TYPE_TO_COLOR,
  TOOLTIP_BOTTOM_CLASSNAME,
  TOOLTIP_TOP_CLASSNAME,
  TOOLTIP_GENERAL_CLASSNAME,
  TOOLTIP_HEIGHT,
  TOOLTIP_WIDTH,
  CENTER_POINTER_CLASS,
  RIGHT_POINTER_CLASS,
  LEFT_POINTER_CLASS,
  PADDING,
  BUFFER,
} from "./constants.js";
import socialElements from "./widgets/social.js";
import widgets from "./widgets/stateful.js";
import { addElements, AbsoluteUnitAdjust } from "./tooltip.js";
import { removeSavedHighlights } from "./widgets/stateful.js";

/**
 * function for finding a search string within body of text
 *
 * @param searchStr the search string
 * @param str the body
 * @param caseSensitive boolean for how to search
 */
function getIndicesOf(searchStr, str, caseSensitive) {
  var searchStrLen = searchStr.length;
  if (searchStrLen == 0) {
    return [];
  }
  var startIndex = 0,
    index,
    indices = [];
  if (!caseSensitive) {
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
  }
  while ((index = str.indexOf(searchStr, startIndex)) > -1) {
    indices.push(index);
    startIndex = index + searchStrLen;
  }
  return indices;
}

/**
 * function for calculating offsets of a highlighted text within an html element
 *
 * @param element an html element
 */
function getSelectionCharOffsetsWithin(element) {
  var start = 0,
    end = 0;
  var sel, range, priorRange;
  if (typeof window.getSelection != "undefined") {
    range = window.getSelection().getRangeAt(0);
    priorRange = range.cloneRange();
    priorRange.selectNodeContents(element);
    priorRange.setEnd(range.startContainer, range.startOffset);
    start = priorRange.toString().length;
    end = start + range.toString().length;
  } else if (
    typeof document.selection != "undefined" &&
    (sel = document.selection).type != "Control"
  ) {
    range = sel.createRange();
    priorRange = document.body.createTextRange();
    priorRange.moveToElementText(element);
    priorRange.setEndPoint("EndToStart", range);
    start = priorRange.text.length;
    end = start + range.text.length;
  }
  return {
    start: start,
    end: end,
  };
}

function getArticleTitle() {
  let titleTag = document.getElementsByTagName("title")[0];
  return titleTag ? titleTag.textContent || titleTag.innerText : "";
}

function getArticleDate() {
  return getMetaTag("sailthru.date");
}

function decodeHighlights() {
  let savedHighlights = null;

  try {
    savedHighlights = localStorage[window.location.href + "-" + "highlights"];
  } catch (e) {
    console.log(e);
  }

  let wordpress = getWordPressArticle();

  if (!wordpress) {
    return;
  }

  if (!savedHighlights) {
    return;
  }

  let highlightArray = JSON.parse(savedHighlights);
  highlightArray.sort(
    (a, b) => Number.parseInt(a.timeOfClick) - Number.parseInt(b.timeOfClick)
  );
  let nodes = getAllNodes(wordpress.children, [], new Set());

  let text = wordpress.textContent;
  const TEXT_CONTENT_MAP = new Array(text.length).fill(false);

  highlightArray.forEach((highlightObj) => {
    if (
      !highlightObj ||
      !highlightObj.text ||
      !highlightObj.overlayData ||
      !highlightObj.id
    ) {
      return;
    }
    let searchText = highlightObj.text;
    let searchIndex = highlightObj.overlayData.occurenceIndex;
    ID_TO_TEXT[highlightObj.id] = searchText;
    let indices = getIndicesOf(searchText, text, true);
    let startIndex =
      searchIndex < indices.length ? indices[searchIndex] : indices[0];
    let endIndex = startIndex + searchText.length - 1;

    for (var i = startIndex; i <= endIndex; i++) {
      if (TEXT_CONTENT_MAP[i]) {
        continue;
      }
      TEXT_CONTENT_MAP[i] = { id: highlightObj.id, type: highlightObj.type };
    }
  });

  addHighlight(nodes, TEXT_CONTENT_MAP, wordpress);
  addListeners();
  // removeCursorHighlightEffect();
}

function addListeners() {
  let highlightedSegments = document.getElementsByClassName(
    "highly-saved-highlight"
  );
  for (var i = 0; i < highlightedSegments.length; i++) {
    highlightedSegments[i].onclick = (e) => popupOnClick(e);
  }
}

function popupOnClick(e) {
  let element = e.target || e.toElement;
  let id = element.id;

  let rect = element.getBoundingClientRect();
  let top = rect.top;

  let tooltip = document.createElement("div");

  tooltip.className =
    top >= TOOLTIP_HEIGHT + BUFFER
      ? TOOLTIP_TOP_CLASSNAME
      : TOOLTIP_BOTTOM_CLASSNAME;
  tooltip.classList.add(TOOLTIP_GENERAL_CLASSNAME);

  let distanceLeft = rect.left;
  let distanceRight = window.innerWidth - rect.width - distanceLeft;
  let halfWidth = TOOLTIP_WIDTH / 2;

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

  addElements(tooltip, widgets, element.dataset["type"]);
  addElements(tooltip, socialElements);

  let highlights = JSON.parse(
    localStorage[window.location.href + "-" + "highlights"]
  );
  let highlight = highlights.find((highlight) => highlight.id === id);

  tooltip.setAttribute("data-id", id);
  tooltip.setAttribute("data-text", highlight.text || " ");
  document.body.appendChild(tooltip);

  window.addEventListener("scroll", AbsoluteUnitAdjust);
}

function addHighlight(nodes, TEXT_CONTENT_MAP, wordpress) {
  removeSavedHighlights(null);
  const text = wordpress.textContent;

  for (var j = 0; j < nodes.length; j++) {
    let currentNode = nodes[j];
    if (
      !currentNode.parentElement ||
      currentNode.parentElement.nodeName === "STYLE" ||
      currentNode.parentElement.nodeName === "SCRIPT" ||
      currentNode.parentElement.className === "highly-saved-highlight"
    ) {
      continue;
    }
    let id = null;
    let currentNodeText = currentNode.textContent;
    //prevent against non-unique highlights hopwfullyy
    if (currentNodeText.length < 20) {
      continue;
    }
    let textNodeStartIndex = text.indexOf(currentNodeText);
    let textNodeEndIndex = textNodeStartIndex + currentNodeText.length;
    let str = "";
    let shouldReplace = false;
    for (var k = textNodeStartIndex; k <= textNodeEndIndex; k++) {
      let additionalText = "";
      if (TEXT_CONTENT_MAP[k] && currentNodeText[k - textNodeStartIndex]) {
        console.log(TEXT_CONTENT_MAP[k]);
        shouldReplace = true;
        id = TEXT_CONTENT_MAP[k].id;
        let type = TEXT_CONTENT_MAP[k].type;
        additionalText +=
          '<span data-type="' +
          type +
          '" id="' +
          id +
          '" class="highly-saved-highlight" style="background-color:' +
          INTERACTION_TYPE_TO_COLOR[type] +
          '">' +
          currentNodeText[k - textNodeStartIndex] +
          "</span>";
      } else {
        additionalText = currentNodeText[k - textNodeStartIndex];
      }
      str = str + (additionalText || "");
    }
    let a = document.createElement("span");
    a.innerHTML = str;
    if (!currentNode.parentElement) continue;
    if (shouldReplace) {
      a.id = id;
      a.className = "highly-saved-highlight-parent";
      currentNode.parentElement.replaceChild(a, currentNode);
    }
  }
}

function getWordPressArticle() {
  let articles = document.getElementsByTagName("ARTICLE");
  return articles[0];
}

function getMetaTag(tagName) {
  let tags = document.getElementsByTagName("meta");
  for (var i = 0; i < tags.length; i++) {
    if (tags[i].getAttribute("name") === tagName)
      return tags[i].getAttribute("content");
  }
}

function getAllNodes(children, textNodes, set) {
  for (var i = 0; i < children.length; i++) {
    let currentChild = children[i];
    if (set.has(currentChild)) continue;
    set.add(currentChild);
    let nextList = currentChild.childNodes;
    if (currentChild.nodeName === "#text") {
      textNodes.push(currentChild);
    }
    if (nextList && nextList.length !== 0) {
      getAllNodes(nextList, textNodes, set);
    }
  }
  return textNodes;
}

function isHighlyElement(element) {
  var i = 0;
  while (
    i < 10 &&
    element &&
    !element.classList.contains(TOOLTIP_GENERAL_CLASSNAME)
  ) {
    element = element.parentElement;
    i++;
  }
  return i < 10 && element;
}

export {
  getIndicesOf,
  getSelectionCharOffsetsWithin,
  getArticleTitle,
  getArticleDate,
  decodeHighlights,
  isHighlyElement,
};
