import JsonBigint from "json-bigint";

const REQUEST_TIMEOUT_SEC = 60000;

export async function backendHealthCheck(backendUrl: string) {
  const controller = new AbortController();
  const { signal } = controller;
  const healthCheck = async () => {
    const response = await fetch(`${backendUrl}/health-check`, {
      signal,
      headers: { mode: "no-cors" },
    });
    return Promise.resolve(response.ok);
  };
  try {
    const isLive = await Promise.race<Promise<boolean>[]>([
      healthCheck(),
      new Promise((_, reject) => setTimeout(() => reject(false), 3000)),
    ]);
    return isLive;
  } catch (error) {
    controller.abort();
    return false;
  }
}

export async function generateImages(
  backendUrl: string,
  text: string,
  numImages: number
) {
  const queryStartTime = new Date().getTime();
  const response = await Promise.race([
    (
      await fetch(`${backendUrl}/dalle`, {
        method: "POST",
        headers: {
          mode: "no-cors",
        },
        body: JSON.stringify({
          text,
          num_images: numImages,
        }),
      }).then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
    ).text(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Timeout")), REQUEST_TIMEOUT_SEC)
    ),
  ]);

  return {
    executionTime:
      Math.round(
        ((new Date().getTime() - queryStartTime) / 1000 + Number.EPSILON) * 100
      ) / 100,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    generatedImages: JsonBigint.parse(response as string),
  };
}
