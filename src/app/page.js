import styles from './page.module.css'
import dynamic from 'next/dynamic'
import InfiniteText from '../components/InfiniteText/InfiniteText'
import About from '@/components/About/About'
import Projects from '../components/Projects/Projects.js'

const Scene = dynamic(() => import('@/components/Scene'), {
    ssr: false,
})

export default function Page() {
    return (
        <>
            <main className={styles.main}>
                <Scene />
                <InfiniteText />
            </main>
            <About />
            <Projects />
        </>
    );
}
