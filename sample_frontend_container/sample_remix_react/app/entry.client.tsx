/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import { RemixBrowser } from '@remix-run/react';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';

// NOTE: mswのモックAPIの設定するとき、
// worker.start()が非同期で実行されて、画面起動時にモックAPIが読み込まれないため、
// async functionでラップして、await worker.start()を実行する
async function main() {
  // NOTE: RemixではLoaderやActionを用いてAPI通信を行うため、フロント側でのAPI通信は不要なはずなのでコメント化
  // モックAPI用の設定
  // if (process.env.NODE_ENV === 'development') {
  //   const { worker } = await import('./mocks/browser');
  //   await worker.start();
  // }

  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <RemixBrowser />
      </StrictMode>,
    );
  });
}

main();
