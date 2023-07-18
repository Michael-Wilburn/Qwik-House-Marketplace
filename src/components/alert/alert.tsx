import type { Signal } from '@builder.io/qwik';
import { component$ } from '@builder.io/qwik';

interface AlertProps {
    message: Signal<string>
}

export const Alert = component$((props: AlertProps) => {

    return (
        <div class="alertError">
            <span>{props.message}</span>
        </div>
    )
})

