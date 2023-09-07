function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

type InterpolateMode = "clamp" | "extend";
function interpolate(
  value: number,
  inputRange: [number, number],
  outputRange: [number, number],
  mode: InterpolateMode = "extend",
): number {
  const [i1, i2] = inputRange;
  const [o1, o2] = outputRange;
  const extendValue = ((value - i1) * (o2 - o1)) / (i2 - i1) + o1;

  if (mode === "clamp") {
    return clamp(extendValue, Math.min(o1, o2), Math.max(o1, o2));
  }

  return extendValue;
}

const containers = document.querySelectorAll(".carousel-container") as NodeListOf<HTMLDivElement>;
containers.forEach((container) => {
  const carousel = container.querySelector(".carousel") as HTMLDivElement;
  if (!carousel) {
    return;
  }

  const images = parseInt(container.dataset.images as string);
  const indicators = container.querySelectorAll(".carousel__indicator") as NodeListOf<HTMLDivElement>;
  const captions = container.querySelectorAll(".carousel__caption") as NodeListOf<HTMLDivElement>;
  const captionHeight = captions[0].clientHeight;

  const flexMax = 60;
  const flexMin = 10;
  const opacityMax = 1;
  const opacityMin = 0.15;

  // reset indicators to initial values
  indicators.forEach((indicator, index) => {
    if (index === 0) {
      indicator.style.flex = `${flexMax}`;
      indicator.style.opacity = `${opacityMax}`;
    } else {
      indicator.style.flex = `${flexMin}`;
      indicator.style.opacity = `${opacityMin}`;
    }
  });

  carousel.addEventListener("scroll", () => {
    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
    const offset = scrollPercentage * (images - 1);

    indicators.forEach((indicator, index) => {
      const flex = interpolate(Math.abs(offset - index), [0, 1], [flexMax, flexMin], "clamp");
      const opacity = interpolate(Math.abs(offset - index), [0, 1], [opacityMax, opacityMin], "clamp");
      indicator.style.flex = `${flex}`;
      indicator.style.opacity = `${opacity}`;
    });

    captions.forEach((caption, index) => {
      const translateY = offset * captionHeight;
      const opacity = interpolate(Math.abs(offset - index), [0, 1], [1, 0], "clamp");
      caption.style.transform = `translateY(${-translateY}px)`;
      caption.style.opacity = `${opacity}`;
    });
  });
});
