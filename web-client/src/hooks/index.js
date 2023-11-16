import { useEffect, useState } from "react";

function useWinClick(target, fn = () => "") {
  useEffect(() => {
    const handleClick = (e) => {
      if (
        e.target.dataset.allow !== target &&
        e.target.dataset.target !== target
      ) {
        fn();
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);
}

function useScroll(fn = () => "", init = () => "") {
  useEffect(() => {
    let oldScrollY = window.scrollY;

    const handleScroll = (e) => {
      fn({
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        scrollLeft: window.screenLeft,
        scrollTop: window.screenTop,
        oldScrollY,
      });

      oldScrollY = window.scrollY;
    };

    init(oldScrollY, window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}

function useIntersect() {}

function useWinScroll(fn = () => "", init = () => "") {
  useEffect(() => {
    let oldScrollY = window.scrollY;

    const handleScroll = (e) => {
      fn(oldScrollY, window.scrollY);

      oldScrollY = window.scrollY;
    };

    init(oldScrollY, window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
}

export { useWinClick, useWinScroll };
