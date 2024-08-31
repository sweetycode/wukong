import { ComponentChildren } from "preact";
import { Resource, ViewType } from "./types";
import _ from '../../utilities/dash';
import Breadcrumb, { BreadcrumbLink } from "../../blocks/Breadcrumb";
import { Link, useParams } from "wouter-preact";
import { Navbar } from '../../blocks/Navbar';
import { Link2Node } from "../../components/Link2";

export function Container({className='', children}: {className?: string, children: ComponentChildren}) {
    return <div className={`max-w-4xl mx-auto p-4 ${className}`}>
        {children}
    </div>
}


export function AdminNavbar({resources}: {resources: Resource[]}) {
    const links = resources.map(({name}) => ({text: _.capitalize(name), href: `/${name}`}))
    return <Link2Node.Provider value={Link}>
        <Navbar name="EngAtWork Admin" links={links}/>
    </Link2Node.Provider>
}

export function AdminBreadcrumb({resource, view}: {resource: Resource, view: ViewType}) {
    const links: BreadcrumbLink[] = [{text: 'Home', href: '/'}]
    const {id} = useParams()
    if (view == 'list') {
        links.push({text: _.capitalize(resource.name), href: ''})
    } else {
        links.push({text: _.capitalize(resource.name), href: `/${resource.name}`})
        if (view == 'create') {
            links.push({text: 'Create', href: ''})
        } else if (view == 'show') {
            links.push({text: id + '', href: ''})
        } else { // view == 'edit'
            links.push({text: id + '', href: `/${resource.name}/${id}`})
            links.push({text: 'Edit', href: ''})
        }
    }
    return <Container>
        <Link2Node.Provider value={Link}>
            <Breadcrumb items={links}/>
        </Link2Node.Provider>
    </Container>
}
