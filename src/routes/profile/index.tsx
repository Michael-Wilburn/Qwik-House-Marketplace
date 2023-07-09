import { component$, useStore, $ } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { getAuth } from 'firebase/auth';

type formDataTypes = { name: string | null, email: string | null }

export default component$(() => {

    const auth = getAuth()
    const user: any = auth.currentUser

    const formData = useStore<formDataTypes>({
        name: user.displayName,
        email: user.email
    })

    const { name, email } = formData

    const navigate = useNavigate()

    const onLogout = $(async () => {
        await navigate('/')
        const auth = getAuth()
        auth.signOut()
    })

    return (
        <div class="profile">
            <header class="profileHeader">
                <p class="pageHeader">
                    My Profile
                </p>
                <button type="button" class="logOut" onClick$={onLogout}>
                    Logout
                </button>
            </header>
            <div class="container">
                <p>{name}</p>
                <p>{email}</p>
            </div>
        </div>
    )
})
