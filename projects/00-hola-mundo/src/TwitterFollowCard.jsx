import { useState } from "react";

export function TwitterFollowCard ({ children, formatUserName, username, initialIsFollowing}){
    const [isFollow, setFollow] = useState(initialIsFollowing);
    const imageSrc = `https://unavatar.io/twitter/${username}`
    const following = isFollow ? 'Siguiendo' : 'Seguir';
    const buttonClassName = isFollow ? 'tw-followCard-button is-following' : 'tw-followCard-button';

    const handleClick = () => {
        setFollow(!isFollow)
    }

    return (
        <article className='tw-follow-card'>
            <header className='tw-follow-card-header'>
                <img className='tw-follow-card-avatar'
                alt="Avatar" src={imageSrc}></img>
                <div className='tw-follow-card-info'>
                    <strong>{children}</strong>
                    <span className='tw-follow-card-infouserName'>{formatUserName(username)}</span>
                </div>
            </header>
            <aside>
                <button className={buttonClassName} onClick={handleClick}>
                    <span className='tw-followCard-text'>{following}</span>
                    <span className='tw-followCard-stopFollow'>Dejar de seguir</span>
                </button>
            </aside>
        </article>
    )
}