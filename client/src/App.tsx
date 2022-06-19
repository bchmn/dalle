import { Component, createSignal, onMount, For } from "solid-js";
import { Loader } from "./components/Loader";
import { BackendStatus } from "./components/BackendStatus";
import { backendHealthCheck, generateImages } from "./dalle-api";
import { InputForm } from "./components/InputForm";

const backendUrl =
  new URLSearchParams(window.location.search).get("backendUrl") ||
  "http://localhost:8200";

const numOfImages =
  new URLSearchParams(window.location.search).get("imageCount") || "3";

const App: Component = () => {
  let inputRef: HTMLInputElement;
  const [isBackendLive, setIsBackendLive] = createSignal<boolean | undefined>();
  const [isGenerating, setIsGenerating] = createSignal<boolean>(false);
  const [executionTime, setExectionTime] = createSignal<number | undefined>();
  const [generatedImages, setGeneratedImages] = createSignal<string[]>([]);
  const isDisabled = () => isBackendLive() !== true || isGenerating();

  onMount(() => {
    void (async () => {
      const isLive = await backendHealthCheck(backendUrl);
      setIsBackendLive(isLive);
      if (isLive) {
        inputRef.focus();
      }
    })();
  });

  const handleGenerateClick = (prompt: string) => {
    void (async () => {
      resetForm();
      const res = await generateImages(
        backendUrl,
        prompt,
        parseInt(numOfImages)
      );
      setIsGenerating(false);
      setExectionTime(res.executionTime);
      setGeneratedImages(res.generatedImages);
    })();
  };

  const resetForm = () => {
    setIsGenerating(true);
    setExectionTime(undefined);
    setGeneratedImages([]);
  };

  return (
    <div class="md:container md:mx-auto h-full flex flex-col items-center gap-14">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="font-['Orbitron'] text-7xl">DALL-E</h1>
        <BackendStatus
          isBackendLive={isBackendLive()}
          backendUrl={backendUrl}
        />
      </div>
      <div class="flex flex-1 flex-col w-8/12 gap-6">
        <InputForm
          // @ts-expect-error inputRef is assigned by solidjs
          ref={inputRef}
          isDisabled={isDisabled()}
          handleGenerateClick={handleGenerateClick}
        />
        {isGenerating() && <Loader />}
        {generatedImages().length && (
          <div class="grid grid-cols-3 gap-10 self-center">
            <For each={generatedImages()}>
              {(imgData, index) => (
                <img
                  class="rounded-sm"
                  alt={`dall-e generated image #${index() + 1}`}
                  src={`data:image/png;base64,${imgData}`}
                />
              )}
            </For>
          </div>
        )}
        {executionTime() && (
          <span class="text-sm text-center pb-10">
            Images generated in {executionTime()} seconds
          </span>
        )}
      </div>
    </div>
  );
};

export default App;
