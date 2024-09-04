import { render } from "preact";
import { Field, HandleSubmit, Resource } from './types';
import { Link, Route, Router } from "wouter-preact";
import { BelongsToField, BelongsToManyField, HtmlField, IdField, ImageField, MarkdownField, StringField, TextField, TimestampField, hideViews } from './Fields';
import { ResourceRoutes } from "./Routes";
import { AdminNavbar, Container } from "./Blocks";
import { httpPost, httpPut } from "../../utilities/http";
import { useHttpBody } from "../../components/hooks";
import Table, { TableRow } from "../../components/Table";


const builtinFields = {
    id: hideViews(IdField, ['create']),
    name: StringField,
    slug: StringField,
    pic: ImageField,
    category: BelongsToField,
    tags: BelongsToManyField,
    source: hideViews(TextField, ['list']),
    intro: hideViews(TextField, ['list']),
    markdown_body: hideViews(MarkdownField, ['list']),
    html_body: hideViews(HtmlField, ['list']),
    generated_html_body: hideViews(HtmlField, ['list', 'edit', 'create']),
    published_at: TimestampField,
    created_at: TimestampField,
    updated_at: hideViews(TimestampField, ['list']),
}

export function createResources({
    customFields = {},
    models,
}: {
    customFields?: {[key: string]: Field},
    models: {
        name: string,
        fields: string[],
        handleSubmit?: HandleSubmit,
    }[]
}): Resource[] {
    const allFields = {...builtinFields, ...customFields}
    return models.map(({name, fields, handleSubmit}) => ({
        name,
        handleSubmit: handleSubmit || defaultHandleSubmit,
        fields: fields
            .map(name => name.trim())
            .map(name => ({name, field: allFields[name]}))
    }))
}

export function renderAdminApp(parent: HTMLElement, {
    base = '/admin',
    resources,
}: {
    base?: string,
    resources: Resource[],
}) {
    render(<AdminApp base={base} resources={resources}/>, parent)
}

export const defaultHandleSubmit: HandleSubmit = async ({resource: {name}, editing, entity, navigate}) => {
    if (Object.keys(editing).length == 0) {
        return
    }

    const {id} = entity
    if (id == null) {
        const url = `/admin/api/${name}`
        httpPost(url, editing).then(({id}) => {
            navigate(`/${name}/${id}`)
        })
    } else {
        const url = `/admin/api/${name}/${id}`
        httpPut(url, editing).then(() => {
            navigate(`/${name}/${id}`)
        })
    }
}



function AdminApp({base, resources}: {
    base: string,
    resources: Resource[],
}) {
    return <Router base={base}>
        <AdminNavbar resources={resources}/>
        {resources.map(resource => <ResourceRoutes resource={resource}/>)}
        <Route path="/" component={HomePage}/>
    </Router>
}


function HomePage() {
    const resources = useHttpBody('/admin/api/stats', [])
    return <Container>
        <Table headers={['resource', 'count']}>
            {resources.map(({resource, count}) => <TableRow>
                <Link className="text-gray-700 hover:text-blue-500" href={`/${resource}`}>{resource}</Link>
                {count}
            </TableRow>)}
        </Table>
    </Container>
}


