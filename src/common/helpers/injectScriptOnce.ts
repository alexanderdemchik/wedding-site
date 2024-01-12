interface IInjectedScripts {
  [k: string]: {
    status: 'pending' | 'done';
    scriptElement?: HTMLScriptElement;
  };
}

// could be exported if you want something like 'isAlreadyInjected' logic
const injectedScripts: IInjectedScripts = {};

export const injectScriptOnce = (src: string): Promise<void> => {
  const injectedScript = injectedScripts[src];
  // if script is already injected
  if (injectedScript) {
    // if script fully loaded just skip
    if (injectedScript.status === 'done') return Promise.resolve();

    // if script load is pending just add another listener on the element
    return new Promise((resolve) => {
      injectedScript.scriptElement?.addEventListener('load', () => resolve);
    });
  }

  return injectScript(src);
};

export const injectScript = (src: string, containerRef?: React.MutableRefObject<HTMLElement>): Promise<void> => {
  const scriptElement = document.createElement('script');
  scriptElement.src = src;
  scriptElement.async = true;

  const container = containerRef?.current || window.document.body;

  container.appendChild(scriptElement);

  injectedScripts[src] = { status: 'pending', scriptElement };

  return new Promise((resolve) => {
    scriptElement.addEventListener('load', () => {
      injectedScripts[src] = { status: 'done' };
      return resolve();
    });
  });
};
