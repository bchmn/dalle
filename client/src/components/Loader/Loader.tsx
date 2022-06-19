import style from "./Loader.module.css";

export const Loader = () => (
  <div class="flex flex-col flex-1 gap-3 items-center justify-center">
    <span class={style.loader} />
    <span class="text-md font-['Orbitron'] text-orange-100">
      Generating Images...
    </span>
  </div>
);
