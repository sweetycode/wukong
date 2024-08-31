import { Route, Switch } from "wouter-preact"
import { Resource, ViewType } from "./types"
import { CreateView, EditView, ListView, ShowView } from "./Views"
import { AdminBreadcrumb, Container } from "./Blocks"

export function ResourceRoutes({resource}: {resource: Resource}) {
    const {name} = resource
    const routes: {view: ViewType, path: string}[] = [
        {view: 'list', path: `/${name}`,},
        {view: 'create', path: `/${name}/create`,},
        {view: 'show', path: `/${name}/:id`,},
        {view: 'edit', path: `/${name}/:id/edit`,},
    ]

    return <Switch>
        {routes.map(({view, path}) => <Route path={path} component={() => <ResourcePage resource={resource} view={view}/>}/>)}
    </Switch>
}


function ResourcePage({resource, view}: {
    resource: Resource,
    view: ViewType
}) {
    return <>
        <AdminBreadcrumb resource={resource} view={view} />
        <Container>
            {view == 'list'? <ListView resource={resource}/>:
                (view == 'show'? <ShowView resource={resource}/>:
                    (view == 'create'? <CreateView resource={resource}/>:
                        <EditView resource={resource}/>
                ))
            }
        </Container>
    </>
}
