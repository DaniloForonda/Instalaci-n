import { useEffect, useState } from "react";

type CodeFileViewerProps = {
  src: string;
  filename: string;
  binaryMessage?: string;
};

function isMostlyText(bytes: Uint8Array) {
  if (bytes.length === 0) return false;
  const sample = bytes.slice(0, 4096);
  let printable = 0;

  for (const byte of sample) {
    if (byte === 9 || byte === 10 || byte === 13 || (byte >= 32 && byte <= 126)) {
      printable++;
    }
  }

  return printable / sample.length > 0.95;
}

export function CodeFileViewer({
  src,
  filename,
  binaryMessage = "Descarga el archivo para abrirlo en la aplicación correspondiente.",
}: CodeFileViewerProps) {
  const [content, setContent] = useState<string | null>(null);
  const [isBinary, setIsBinary] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;

    fetch(src)
      .then((response) => response.arrayBuffer())
      .then((buffer) => {
        if (cancelled) return;

        const bytes = new Uint8Array(buffer);

        if (isMostlyText(bytes)) {
          setContent(new TextDecoder().decode(buffer));
          setIsBinary(false);
        } else {
          setIsBinary(true);
        }
      })
      .catch(() => {
        if (!cancelled) setIsBinary(true);
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  return (
    <div className="content-panel h-full overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-gray-200 px-3 sm:px-4 py-2.5 bg-gray-100">
        <span className="font-mono text-xs sm:text-sm font-medium text-gray-800 truncate pr-2">
          {filename}
        </span>
        <a
          href={src}
          download={filename}
          className="shrink-0 text-xs sm:text-sm font-medium text-blood hover:underline"
        >
          Descargar
        </a>
      </div>

      <div className="min-h-[240px] max-h-[320px] w-full bg-[#fafafa]">
        {isBinary === null && (
          <div className="flex min-h-[240px] items-center justify-center text-sm text-gray-500">
            Cargando archivo…
          </div>
        )}

        {isBinary === false && content !== null && (
          <pre className="min-h-[240px] max-h-[320px] overflow-auto p-3 sm:p-4 text-xs sm:text-sm leading-relaxed font-mono text-gray-800 whitespace-pre-wrap break-words">
            {content}
          </pre>
        )}

        {isBinary === true && (
          <div className="flex min-h-[240px] max-h-[320px] flex-col">
            <object
              data={src}
              type="application/octet-stream"
              className="min-h-[180px] w-full flex-1"
            >
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-8 text-center">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {binaryMessage}
                </p>
                <a
                  href={src}
                  download={filename}
                  className="inline-block px-6 py-2 text-sm font-medium text-white bg-blood-dark/90 rounded-md hover:bg-blood-dark transition-colors duration-300"
                >
                  Descargar {filename}
                </a>
              </div>
            </object>
          </div>
        )}
      </div>
    </div>
  );
}
