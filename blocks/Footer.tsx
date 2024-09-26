import { env } from "../utilities/environ";

export default function Footer({sentence, links}: {sentence: string, links: {text: string, href: string}[]}) {
    return <footer class="p-4 md:p-8 lg:p-10">
        <hr class="my-6 border-gray-200 sm:mx-auto lg:my-8"/>
        <div class="mx-auto max-w-4xl text-center px-4"> 
            <p class="my-6 text-gray-500">{sentence}</p>
            <ul class="flex flex-wrap justify-center items-center mb-6 text-gray-500 text-sm">
                {links.map(({text, href}) => <li>
                    <a href={href} class="mr-4 hover:underline md:mr-6 hover:text-gray-600">{text}</a>
                </li>)}
            </ul>
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023-2024 <a href="/" class="hover:underline">{env('APP_NAME')}</a>. All Rights Reserved.</span>
        </div>
    </footer>
}