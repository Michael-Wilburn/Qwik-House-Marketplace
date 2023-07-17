import { component$, useSignal } from '@builder.io/qwik';

interface AlertProps {
    message: string;
}

export const Alert = component$((props: AlertProps) => {
    const isVisible = useSignal(true);

    setTimeout(() => {
        isVisible.value = false;
    }, 3000);

    return isVisible.value ? <div>{props.message}</div> : null;
})