import { useEffect, useState } from "react";

export default function ImageSlider({ images = [] }) {
  const list = images.length ? images : ["/logo.png"];
  const [selected, setSelected] = useState(list[0]);

  useEffect(() => {
    setSelected(list[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.join("|")]);

  return (
    <div className="w-full flex flex-col items-center">
      <img src={selected} alt="product" className="w-full h-[300px] md:h-[450px] object-cover rounded-2xl bg-slate-100" />
      {list.length > 1 && (
        <div className="w-full mt-4 flex gap-2 overflow-x-auto pb-1">
          {list.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`view ${index + 1}`}
              onClick={() => setSelected(image)}
              className={`w-[72px] h-[72px] shrink-0 object-cover rounded-lg cursor-pointer border-2 ${
                image === selected ? "border-accent" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
