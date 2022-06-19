import { Component } from "solid-js";
import { Tooltip } from "./Tooltip";

export const BackendStatus: Component<{
  isBackendLive: boolean | undefined;
  backendUrl: string;
}> = (props) => (
  <div class="relative rounded-sm ring-1 ring-slate-700 px-3 py-1 cursor-pointer">
    {props.isBackendLive === undefined ? (
      <div class="flex items-center gap-1.5">
        <svg
          class="animate-spin h-3 w-3 text-slate-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        <span class="text-md">Connecting to Backend</span>
      </div>
    ) : (
      <Tooltip message={props.backendUrl}>
        <div class="flex items-center gap-1.5">
          <div
            classList={{
              "rounded-full": true,
              "w-3": true,
              "h-3": true,
              "drop-shadow-lg": true,
              "bg-red-600": !props.isBackendLive,
              "bg-green-600": props.isBackendLive,
            }}
          />
          <span class="text-md">
            {props.isBackendLive ? "Connected to Backend" : "Backend Offline"}
          </span>
        </div>
      </Tooltip>
    )}
  </div>
);
