import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'
export function App() {

    const formatUserName = (userName) => `@${userName}`

    const users = [
        {
            userName: 'Papers_app',
            name: 'xolo',
            isFollowing: true
        },
        {
            userName: 'BFrog__',
            name: 'Frog',
            isFollowing: false
        },
        {
            userName: 'RaulE_Rojo',
            name: 'Rojelio',
            isFollowing: true
        },
        {
            userName: 'midudev',
            name: 'Midu',
            isFollowing: true
        },
        {
            userName: 'elmejorcamaron',
            name: 'Camaron',
            isFollowing: false
        },
    ]

    return (
        <section className='App'>
            {
                users.map(user => {
                    const {userName, name, isFollowing} = user

                    return (
                        <TwitterFollowCard
                        key={userName}
                        formatUserName={formatUserName}
                        initialIsFollowing={isFollowing}
                        username={userName}>
                            {name}
                        </TwitterFollowCard>            
                    )
                })
            }
        </section>
    )
}