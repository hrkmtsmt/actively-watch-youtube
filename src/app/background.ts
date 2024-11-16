export default defineBackground(() => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  console.log('Hello background!', { id: browser.runtime.id });
});
