import ui from "../../assets/icons/sprites/ui.svg";
import circle from "../../assets/icons/sprites/wecons-circle.svg";
import helix from "../../assets/icons/sprites/wecons-helix.svg";

const parser = new DOMParser();
const svgDocuments = [ui, circle, helix].map((svgUrl) =>
  fetch(svgUrl)
    .then((response) => response.text())
    .then((svgString) => parser.parseFromString(svgString, "image/svg+xml"))
);

Promise.all(svgDocuments).then((docs) => {
  const iconsMap = docs.reduce((map, doc) => {
    const svgElements = doc.querySelectorAll("svg [id]");
    svgElements.forEach((element) => {
      if (element instanceof SVGElement) {
        const key = element.id;
        map[key] = element;
      }
    });
    return map;
  }, {} as Record<string, SVGElement>);

  // You might want to dispatch a custom event here to signal that the icons are ready
  window.dispatchEvent(new CustomEvent("iconsReady", { detail: iconsMap }));
});

export const getIconsMap = (): Promise<Record<string, SVGElement>> => {
  return new Promise((resolve) => {
    if ((window as any).iconsMap) {
      resolve((window as any).iconsMap);
    } else {
      window.addEventListener("iconsReady", ((event: CustomEvent) => {
        (window as any).iconsMap = event.detail;
        resolve(event.detail);
      }) as EventListener);
    }
  });
};

// Add this type declaration at the bottom of the file
declare module "*.svg" {
  const content: string;
  export default content;
}
