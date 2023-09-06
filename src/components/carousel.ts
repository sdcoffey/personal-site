function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function interpolate(value: number, inputRange: [number, number], outputRange: [number, number]): number {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  return ((value - inputMin) * (outputMax - outputMin)) / (inputMax - inputMin) + outputMin;
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

  const max = 60;
  const min = 10;

  // reset indicators to initial values
  indicators.forEach((indicator, index) => {
    if (index === 0) {
      indicator.style.flex = `${max}`;
      indicator.style.opacity = `1`;
    } else {
      indicator.style.flex = `${min}`;
      indicator.style.opacity = "0.5";
    }
  });

  carousel.addEventListener("scroll", () => {
    const { scrollLeft, scrollWidth, clientWidth } = carousel;
    const scrollPercentage = scrollLeft / (scrollWidth - clientWidth);
    const offset = scrollPercentage * (images - 1);

    indicators.forEach((indicator, index) => {
      const flex = clamp(interpolate(Math.abs(offset - index), [0, 1], [max, min]), min, max);
      const opacity = clamp(interpolate(Math.abs(offset - index), [0, 1], [1, 0.5]), 0.5, 1);
      indicator.style.flex = `${flex}`;
      indicator.style.opacity = `${opacity}`;
    });

    captions.forEach((caption) => {
      const translateY = offset * captionHeight;
      caption.style.transform = `translateY(${-translateY}px)`;
    });
  });
});
