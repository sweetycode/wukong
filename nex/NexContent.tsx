import type { ComponentChildren } from "preact"
import { applyStyleMixer, type StyleMixer } from "../stylemixer/stylemixer"
import type { Moment } from "moment"


export interface NexPostType {
    title: string,
    slug: string,
    thumnail?: string,
    intro?: string,
    category?: {name: string, slug: string},
    pubDate?: Moment,
    tags?: string[],
}

export const nexPostListStyles = {
    container: `space-y-6`,
    itemContainer: `flex space-x-4 group`,
    thumbnailContainer: ``,
    textualContainer: `flex-1 items-center`,
    thumbnail: ``,
    title: `text-lg font-medium hover:text-blue-600`,
    intro: ``,
    category: ``,
    pubDate: `text-xs text-gray-500 my-3`,
    tagsContainer: ``,
    tag: ``
}

export function NexPostList({posts, mixer}: {
    posts: NexPostType[],
    mixer?: StyleMixer<typeof nexPostListStyles>
}) {
    const styles = applyStyleMixer(nexPostListStyles, mixer)
    return <div className={styles.container}>
        {posts.map(post => <div className={styles.itemContainer}>
            {post.thumnail && <a href={`/posts/${post.slug}`} className={styles.thumbnailContainer}>
                <img src={post.thumnail} alt={post.title} className={styles.thumbnail}/>    
            </a>}
            <div className={styles.textualContainer}>
                <h3><a href={`/posts/${post.slug}`} className={styles.title}>{post.title}</a></h3>
                <div>{post.pubDate && <span className={styles.pubDate}>{post.pubDate.fromNow()}</span>}</div>
            </div>
        </div>)}
    </div>
}


const defaultSimplePaginationStyles = {
    container: `text-center my-4 space-x-8 text-sm`,
    link: `hover:text-blue-500`,
    text: `text-gray-400`,
    currentPage: `text-gray-700`,
}

export function NexSimplePagination({prev, currentPage, next, mixer}: {
    prev: {text: string, href?: string},
    currentPage: string,
    next: {text: string, href?: string},
    mixer?: StyleMixer<typeof defaultSimplePaginationStyles>,
}) {
    const styles = applyStyleMixer(defaultSimplePaginationStyles, mixer)
    return <div className={styles.container}>
        {prev.href? <a href={prev.href} className={styles.link}>{prev.text}</a>: <span className={styles.text}>{prev.text}</span>}
        <span className={styles.currentPage}>{currentPage}</span>
        {next.href? <a href={next.href} className={styles.link}>{next.text}</a>: <span className={styles.text}>{next.text}</span>}
    </div>
}




export const nexSimplePostListStyles = {
    container: ``,
    item: ``,
    title: ``,
    thumbnail: ``,
    category: ``,
}

export const nexPostStyles = {
    container: ``,
    elementsContainer: ``,
    title: `text-4xl font-bold my-6`,
    metadataContainer: `text-sm text-gray-500 mt-4 mb-5`,
    pubDate: ``,
    category: ``,
    bodyContainer: `prose max-w-full`,
    tagsContainer: ``,
    tag: ``,
}

export function NexPost({post, children, mixer}: {
    post: NexPostType,
    children: ComponentChildren,
    mixer?: StyleMixer<typeof nexPostStyles>
}) {
    const styles = applyStyleMixer(nexPostStyles, mixer)
    return <div className={styles.container}>
        <div className={styles.elementsContainer}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.metadataContainer}>
                {post.category && <a className={styles.category} href={post.category.slug}>{post.category.name}</a>}
                {post.pubDate && <span className={styles.pubDate}>{post.pubDate}</span>}
            </div>
            <div className={styles.bodyContainer}>
                {children}
            </div>
            {post.tags && <div className={styles.tagsContainer}>
                {post.tags.map(name => <a href={`/tags/${name}`} className={styles.tag}>{name}</a>)}
            </div>}
        </div>
    </div>
}