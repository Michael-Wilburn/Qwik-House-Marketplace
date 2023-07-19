import { component$, useStore, $, useSignal } from '@builder.io/qwik';
import { useNavigate } from '@builder.io/qwik-city';
import { getAuth, updateProfile } from 'firebase/auth';
import { db } from '../../config/firebase.config'
import { updateDoc, doc } from 'firebase/firestore';

type formDataTypes = { name: string | null, email: string | null }

export default component$(() => {

    const auth = getAuth()
    const changeDetail = useSignal(false)
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

    const onSubmit = $(async () => {
        try {
            const auth = getAuth()
            const user = auth.currentUser
            if (user != null && user.displayName !== name) {
                // Update Display name in fb
                await updateProfile(user, {
                    displayName: name,
                })
                console.log('try')

                // Update in FireStore
                const userRef = doc(db, 'users', user.uid)
                await updateDoc(userRef, {
                    name: name
                })
            }
        } catch (error) {
            console.log(error)
        }

    })

    const onChange = $((event: any) => {
        if (event.target.id === 'name') {
            formData.name = event.target.value
        }
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
            <main>
                <div class="profileDetailsHeader">
                    <p class="profileDetailsText">Personal Details</p>
                    <p class="changePersonalDetails" onClick$={() => {
                        changeDetail.value && onSubmit()
                        changeDetail.value = !changeDetail.value

                    }}>{changeDetail.value ? 'done' : 'change'}</p>
                </div>
                <div class="profileCard">
                    <form preventdefault:submit>
                        <input
                            type="text"
                            id="name"
                            class={!changeDetail.value ? 'profileName' : 'profileNameActive'}
                            disabled={!changeDetail.value}
                            value={name}
                            onChange$={onChange}
                        />
                        <input
                            type="text"
                            id="email"
                            class='profileEmail'
                            disabled
                            value={email}
                            onChange$={onChange}
                        />
                    </form>
                </div>
            </main>
        </div>
    )
})
