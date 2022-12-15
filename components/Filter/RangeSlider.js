import React from "react";

export default function RangeSlider({
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
}) {
  // Input constraints
  const minPriceAllowed = 0;
  const maxPriceAllowed = 20000;
  // Used for styling/padding
  const pricePadding = 50; // adjust min/max inputs so they arent 'equal'
  const maxSliderRange = 600; // default length of slider and max price
  const sliderPaddingPercent = 96; // normally 100, adjusted for w/h of elements
  // Reflect price changes 
  const onLowPriceChange = (e) => {
    e.target.value < maxPriceAllowed
      ? setMinPrice(parseInt(e.target.value))
      : setMinPrice(maxPriceAllowed - 1);

    if (parseInt(e.target.value) > parseInt(maxPrice)) {
      e.target.value < maxPriceAllowed
        ? setMaxPrice(parseInt(e.target.value) + pricePadding)
        : setMaxPrice(maxPriceAllowed);
    }
  };
  const onMaxPriceChange = (e) => {
    e.target.value < maxPriceAllowed
      ? setMaxPrice(parseInt(e.target.value))
      : setMaxPrice(maxPriceAllowed);

    if (parseInt(e.target.value) < parseInt(minPrice)) {
      parseInt(e.target.value) - pricePadding < minPriceAllowed
        ? setMinPrice(minPriceAllowed)
        : setMinPrice(parseInt(e.target.value) - pricePadding);
    }
  };
  // Modify Padding for range/sliders when price options change
  const findPadding = (price) => {
    if (minPriceAllowed >= price) return minPriceAllowed;

    return price < maxSliderRange
      ? (price / maxSliderRange) * sliderPaddingPercent
      : sliderPaddingPercent;
  };

  return (
    <div className="w-full py-8 flex justify-center items-center">
      {/* Container */}
      <div className="relative w-full">
        {/* Range Slider */}
        <section id="rangeSlider">
          {/* Min Price Controls. Reflect changes of artificial thumbs so we can process them */}
          {/* These are 'hidden' underneath */}
          <input
            type="range"
            min={0}
            max={maxSliderRange}
            value={minPrice}
            className="absolute h-2 w-full opacity-0 cursor-pointer z-20"
            onInput={(e) => onLowPriceChange(e)}
          />
          <input
            type="range"
            min={1}
            max={maxSliderRange}
            value={maxPrice}
            className="absolute h-2 w-full opacity-0 cursor-pointer z-20"
            onInput={(e) => onMaxPriceChange(e)}
          />
          {/* Visible range/thumbs */}
          <div className="relative h-2 text-center">
            {/* Range background colors */}
            <div className="absolute w-full top-0 bottom-0 rounded-md bg-gray-100" />
            <div
              className="absolute left-0 right-0 bottom-0 top-0 rounded-md bg-blue-300"
              style={{
                left: `${findPadding(minPrice) + "%"}`,
                right: `${sliderPaddingPercent - findPadding(maxPrice) + "%"}`,
              }}
            />
            {/* Artificial range thumbs. Min/Max that are visible */}
            <div
              id="minPrice"
              style={{ left: `${findPadding(minPrice) + "%"}` }}
              className="absolute w-8 h-8 top-0 bg-gray-200 rounded-full -mt-3 border border-gray-500"
            />
            <div
              id="maxPrice"
              style={{ left: `${findPadding(maxPrice) + "%"}` }}
              className="absolute w-8 h-8 top-0 right-0 bg-gray-200 rounded-full -mt-3 border border-gray-500"
            />
          </div>
        </section>
        {/* Input fields */}
        <section className="mt-12 flex gap-2">
          <div className="relative flex-grow leading-none pl-4 pt-2 text-gray-500  border rounded-lg z-10">
            <label
              htmlFor="minPriceInput"
              className="absolute w-full h-full top-0 bottom-0 left-0 opacity-0 z-20"
            />
            <span className="text-xs leading-none">min price</span>
            <div className="leading-none">
              <span>$ </span>
              <input
                id="minPriceInput"
                className="text-black focus:outline-none appearance-none"
                type="number"
                placeholder={"0"}
                value={minPrice}
                min={0}
                max={9999}
                onInput={(e) => onLowPriceChange(e)}
              />
            </div>
          </div>
          <span className="p-4"> - </span>
          <div className="relative flex-grow leading-none  pl-4 pt-2 text-gray-500  border rounded-lg">
            <label
              htmlFor="maxPriceInput"
              className="absolute w-full h-full top-0 bottom-0 left-0 opacity-0 z-10"
              value={" "}
            />
            <span className="text-xs leading-none">max price</span>
            <div className="leading-none">
              <span>$ </span>
              <input
                id="maxPriceInput"
                type="number"
                className="text-black focus:outline-none appearance-none"
                placeholder={maxSliderRange + "+"}
                value={maxPrice}
                max={maxPriceAllowed}
                onInput={(e) => onMaxPriceChange(e)}
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
