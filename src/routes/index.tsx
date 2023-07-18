import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <h1>explore</h1>
    </>
  );
});

export const head: DocumentHead = {
  title: 'House Marketplace',
  meta: [
    {
      name: 'House Marketplace App',
      content: 'Qwik app',
    },
  ],
};
