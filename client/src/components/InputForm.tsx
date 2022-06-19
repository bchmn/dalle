import { Component, createSignal } from "solid-js";

interface InputFormProps {
  isDisabled: boolean;
  handleGenerateClick: (prompt: string) => void;
}

export const InputForm: Component<InputFormProps> = (props) => {
  let inputRef: HTMLInputElement;
  const [prompt, setPrompt] = createSignal("");

  return (
    <div class="flex flex-col gap-2">
      <div class="flex gap-3 relative">
        <input
          // @ts-expect-error inputRef is assigned by solidjs
          ref={inputRef}
          type="text"
          disabled={props.isDisabled}
          value={prompt()}
          onChange={(e) => setPrompt(e.currentTarget.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && props.handleGenerateClick(prompt())
          }
          class="w-full rounded-md p-3 text-xl dark:bg-slate-800 ring-1 ring-slate-700 focus:outline-none disabled:text-gray-500 disabled:cursor-default"
        />
        <button
          disabled={props.isDisabled}
          class="bg-orange-500 hover:bg-orange-400 disabled:bg-slate-800 text-gray-200 disabled:text-gray-500 font-bold py-2 px-4 rounded-md focus:outline-none"
          onClick={() => props.handleGenerateClick(prompt())}
        >
          Generate
        </button>
      </div>
    </div>
  );
};
