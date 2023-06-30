import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { app } from '../config/firebase.config'

export default component$(() => {
  return (
    <>
      <h1>explore</h1>
      <button onClick$={() => console.log(app)}>greet!</button>
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
