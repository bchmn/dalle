import { Component, JSX } from "solid-js";

export const Tooltip: Component<{ message: string; children?: JSX.Element }> = (
  props
) => {
  return (
    <div class="flex flex-col items-center group">
      {props.children}
      <div class="absolute top-[125%] flex-col items-center hidden whitespace-nowrap group-hover:flex">
        <div class="w-3 h-3 -mb-2 rotate-45 bg-gray-600/90 z-0" />
        <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600/90 shadow-lg rounded-md">
          {props.message}
        </span>
      </div>
    </div>
  );
};
