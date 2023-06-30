import { Explore, Offer, Profile } from '../../assets/icons/navbarIcons'
import { component$ } from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';

export const Navbar = component$(() => {
    const nav = useNavigate();
    const loc = useLocation();

    const pathMatchRoute = (route: string) => {
        if (route === loc.url.pathname) {
            return true
        }
    }

    return (
        <footer class="navbar">
            <nav class="navbarNav">
                <ul class="navbarListItems">
                    <li
                        class="navbarListItem"
                        onClick$={async () => { await nav('/') }}
                        style={{ color: `${pathMatchRoute('/') ? "#2c2c2c" : "#8f8f8f"}` }}
                    >
                        <Explore fill={`${pathMatchRoute('/') ? "#2c2c2c" : "#8f8f8f"}`} />
                        <p>Explore</p>
                    </li>
                    <li
                        class="navbarListItem"
                        onClick$={async () => { await nav('/offers') }}
                        style={{ color: `${pathMatchRoute('/offers/') ? "#2c2c2c" : "#8f8f8f"}` }}
                    >
                        <Offer fill={`${pathMatchRoute('/offers/') ? "#2c2c2c" : "#8f8f8f"}`} />
                        <p>Offer</p>
                    </li>
                    <li
                        class="navbarListItem"
                        onClick$={async () => { await nav('/profile') }}
                        style={{ color: `${pathMatchRoute('/profile/') ? "#2c2c2c" : "#8f8f8f"}` }}
                    >
                        <Profile fill={`${pathMatchRoute('/profile/') ? "#2c2c2c" : "#8f8f8f"}`} />
                        <p>Profile</p>
                    </li>
                </ul>
            </nav>
        </footer>
    )
});