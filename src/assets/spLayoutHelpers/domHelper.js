window.onload = function () {
    var base = document.getElementsByTagName("base");

    if (!base) return;

    var baseTag = base[0];
    var parentElement = base[0].parentElement;
    if (IsNode(parentElement, "head")) return;

    parentElement.setAttribute("layout", "column");

    while (parentElement && !IsNode(parentElement, "html") && parentElement.getAttribute("id") != "s4-bodyContainer"){
        parentElement.style.height = "100%";
        parentElement = parentElement.parentElement;
    }
}

function IsNode(element, name) {
    return element.nodeName.toUpperCase() == name.toUpperCase()
}
