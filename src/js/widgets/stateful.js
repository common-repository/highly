import { getArticleTitle, getArticleDate, decodeHighlights } from "../utils.js";
// Documentation: In order to get the svg to flip we used transform="scale(-1 1) translate(-367,0)" for every path
const widgets = [
  {
    name: "SAVE_TEXT",
    html:
      '<svg class="highly-pen" style="height:22px; fill: white" viewBox="0 0 367 367.36171" xmlns="http://www.w3.org/2000/svg"><path transform="scale(-1 1) translate(-367,0)" d="m150.097656 193.75 43.558594-43.558594 21.214844 21.210938-43.5625 43.558594zm0 0"/><path transform="scale(-1 1) translate(-367,0)" d="m29.609375 2.980469c-1.878906-1.90625-4.445313-2.980469-7.121094-2.980469s-5.242187 1.074219-7.121093 2.980469l-12.3125 12.476562c-3.851563 3.917969-3.828126 10.207031.046874 14.101563l21.1875 21.179687 26.40625-26.40625zm0 0"/><path transform="scale(-1 1) translate(-367,0)" d="m331.960938 288.488281-102.945313-102.945312-43.558594 43.5625 102.945313 102.941406c1.039062 1.042969 2.113281 2.050781 3.199218 3.039063l43.390626-43.394532c-.980469-1.089844-1.988282-2.164062-3.03125-3.203125zm0 0"/><path transform="scale(-1 1) translate(-367,0)" d="m346.828125 308.148438-38.769531 38.769531c5.496094 3.085937 11.304687 5.582031 17.324218 7.453125l41.886719 12.992187-12.988281-41.890625c-1.871094-6.019531-4.367188-11.828125-7.453125-17.324218zm0 0"/><path transform="scale(-1 1) translate(-367,0)" d="m56.246094 129.25c-9.195313-9.199219-11.417969-23.277344-5.507813-34.863281l85.222657 85.21875 43.558593-43.558594-106.128906-106.128906-43.5625 43.5625 6.34375 6.339843c-13.566406 19.863282-11.074219 46.5625 5.929687 63.574219l80.035157 80.03125c3.90625 3.90625 10.238281 3.90625 14.140625 0 3.90625-3.902343 3.90625-10.234375 0-14.140625zm0 0"/></svg><span class="highly-tooltiptext">Save Text</span>',
    negativeHtml:
      '<svg class="highly-pen" style="height:22px; fill: #66ccff" viewBox="0 0 367 367.36171" xmlns="http://www.w3.org/2000/svg"><path transform="scale(-1 1) translate(-367,0)" d="m150.097656 193.75 43.558594-43.558594 21.214844 21.210938-43.5625 43.558594zm0 0"/><path transform="scale(-1 1) translate(-367,0)" d="m29.609375 2.980469c-1.878906-1.90625-4.445313-2.980469-7.121094-2.980469s-5.242187 1.074219-7.121093 2.980469l-12.3125 12.476562c-3.851563 3.917969-3.828126 10.207031.046874 14.101563l21.1875 21.179687 26.40625-26.40625zm0 0"/><path transform="scale(-1 1) translate(-367,0)" d="m331.960938 288.488281-102.945313-102.945312-43.558594 43.5625 102.945313 102.941406c1.039062 1.042969 2.113281 2.050781 3.199218 3.039063l43.390626-43.394532c-.980469-1.089844-1.988282-2.164062-3.03125-3.203125zm0 0"/><path transform="scale(-1 1) translate(-367,0)" d="m346.828125 308.148438-38.769531 38.769531c5.496094 3.085937 11.304687 5.582031 17.324218 7.453125l41.886719 12.992187-12.988281-41.890625c-1.871094-6.019531-4.367188-11.828125-7.453125-17.324218zm0 0"/><path transform="scale(-1 1) translate(-367,0)" d="m56.246094 129.25c-9.195313-9.199219-11.417969-23.277344-5.507813-34.863281l85.222657 85.21875 43.558593-43.558594-106.128906-106.128906-43.5625 43.5625 6.34375 6.339843c-13.566406 19.863282-11.074219 46.5625 5.929687 63.574219l80.035157 80.03125c3.90625 3.90625 10.238281 3.90625 14.140625 0 3.90625-3.902343 3.90625-10.234375 0-14.140625zm0 0"/></svg><span class="highly-tooltiptext">Unsave Text</span>',
    classname: "save-highlight icon-highly",
    negativeType: "general_highlight",
    action: (tooltip) => handleTextSave(tooltip, "general_highlight"),
    negativeAction: (tooltip) => handleTextUnSave(tooltip),
  },
];

function handleTextSave(tooltip, type) {
  // console.log("clicked");
  let text = tooltip.getAttribute("data-text");
  let occurenceIndex = Number.parseInt(tooltip.getAttribute("data-occurence"));

  let highlightObj = {
    id: "d" + Math.floor(Math.random() * 1000000),
    type: type,
    text: text,
    timeOfClick: new Date().getTime(),
    overlayData: {
      occurenceIndex: occurenceIndex,
    },
    articleMeta: {
      url: window.location.href,
      hostname: window.location.hostname,
      date: getArticleDate(),
      title: getArticleTitle(),
    },
  };

  let savedHighlights = null;
  try {
    savedHighlights = localStorage[window.location.href + "-" + "highlights"];
  } catch (e) {
    console.log(e);
  }

  let highlightArray = savedHighlights ? JSON.parse(savedHighlights) : [];
  highlightArray.push(highlightObj);

  try {
    localStorage[window.location.href + "-" + "highlights"] = JSON.stringify(
      highlightArray
    );
  } catch (e) {
    console.log(e);
  }

  decodeHighlights();
}

function handleTextUnSave(tooltip) {
  let id = tooltip.getAttribute("data-id");
  if (!id) {
    return;
  }
  window.getSelection().removeAllRanges();
  let arr = [];
  try {
    arr = JSON.parse(localStorage[window.location.href + "-" + "highlights"]);
  } catch (e) {
    console.log(e);
  }
  // console.log(JSON.parse(JSON.stringify(arr)));
  arr = arr.filter((a) => a.id !== id);
  // console.log(JSON.parse(JSON.stringify(arr)));
  try {
    localStorage[window.location.href + "-" + "highlights"] = JSON.stringify(
      arr
    );
  } catch (e) {
    console.log(e);
  }
  removeSavedHighlights(id);
  decodeHighlights();
}

function removeSavedHighlights(id) {
  let spans = document.getElementsByClassName("highly-saved-highlight");
  let length = spans.length;
  for (var i = 0; i < length; i++) {
    if (spans[i].id === id || !id) {
      if (spans[i].parentElement && spans[i].childNodes[0]) {
        spans[i].parentElement.replaceChild(spans[i].childNodes[0], spans[i]);
        i--;
        length = spans.length;
      }
    }
  }

  let parents = document.getElementsByClassName(
    "highly-saved-highlight-parent"
  );
  for (var j = 0; j < parents.length; j++) {
    if (isEmptyParent(parents[j])) {
      parents[j].normalize();
      var nodesFragment = document.createDocumentFragment();
      let nodes = parents[j].childNodes;
      let length = nodes.length;
      for (var i = 0; i < length; i++) {
        nodesFragment.appendChild(nodes[0]);
      }
      if (parents[j].parentElement) {
        parents[j].parentElement.replaceChild(nodesFragment, parents[j]);
      }
      parents = document.getElementsByClassName(
        "highly-saved-highlight-parent"
      );
      j -= 1;
    } else {
      parents[j].normalize();
    }
  }
}

function isEmptyParent(parent) {
  let children = parent.childNodes;
  for (var i = 0; i < children.length; i++) {
    if (
      children[i].className === "highly-saved-highlight" ||
      children[i].className === "highly-saved-highlight-overlay"
    ) {
      return false;
    }
  }

  return true;
}

export default widgets;
export { removeSavedHighlights };
