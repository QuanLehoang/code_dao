import { useEffect, useState } from "react";

type ClickIcon = {
  id: number;
  x: number;
  y: number;
};

export default function ClickIcons() {
  const [clickIcons, setClickIcons] = useState<ClickIcon[]>([]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const newIcon: ClickIcon = {
        id: Date.now() + Math.random(),
        x: event.clientX,
        y: event.clientY,
      };

      setClickIcons((prev) => [...prev, newIcon]);

      setTimeout(() => {
        setClickIcons((prev) =>
          prev.filter((item) => item.id !== newIcon.id)
        );
      }, 1000);
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      {clickIcons.map((item) => (
        <span
          key={item.id}
          className="click-random-icon"
          style={{
            left: item.x,
            top: item.y,
          }}
        >
          {"\u2665"}
        </span>
      ))}
    </>
  );
}
