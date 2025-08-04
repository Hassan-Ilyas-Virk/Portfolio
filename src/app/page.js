import styles from './page.module.css'
import dynamic from 'next/dynamic'
import InfiniteText from '../components/InfiniteText/InfiniteText'
import About from '@/components/About/About'
import Projects from '../components/Projects/Projects.js'
import Contact from '../components/Contact/contact.js'
import "../components/Contact/contact.css";
const Scene = dynamic(() => import('@/components/Scene'), {
    ssr: false,
})

export default function Page() {
    return (
        <>
            <main className={styles.main} suppressHydrationWarning={true}>
                <Scene />
                <InfiniteText />
            </main>
            <About />
            <Projects />
            <Contact />
        </>
    );
}
