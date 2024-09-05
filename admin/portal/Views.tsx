import { useLocation, useParams } from 'wouter-preact';
import { useHttpBody, useObjectState } from '../../components/hooks';
import type { Entity, Resource, ViewType } from './types';
import { IconLink } from "./Controls";
import { IconPlus } from '../../icons/IconFonts';
import Table, { TableRow } from '../../components/Table';
import {SimpleJsonViewer} from '../../integrations/simplejsonview/index';


function useResourceEntity(name: string, id: number|string) {
    return useHttpBody<Entity>(`/admin/api/${name}/${id}`, {})
}

export function ListView({resource}: {
    resource: Resource,
}) {
    const view: ViewType = 'list'
    const fieldProps = {
        view,
        resource,
        editing: {},
        entity: {},
        updateEditing: (v) => console.error('unexpected change in list view: ', v)
    }
    const {name, fields} = resource
    const response = useHttpBody(`/admin/api/${name}`, {})
    const entities = response['data'] ?? []
    const headers = fields.map(({field, name}) => field({...fieldProps, name}) !== undefined ? name: null)
        .filter(name => name != null);

    return <div>
        <div className="float-right py-2">
            <IconLink href={`/${resource.name}/create`}><IconPlus size="30"/></IconLink>
        </div>
        <Table headers={headers}>
            {entities.map(entity => <TableRow>
                {fields.map(({name, field}) => field({...fieldProps, entity, name})).filter(v => v !== undefined)}
            </TableRow>)}
        </Table>
    </div>
}

export function ShowView({resource}: {
    resource: Resource,
}) {
    const {id} = useParams()
    const entity = useResourceEntity(resource.name, id)
    return <div className="space-y-4">
        {resource.fields.map(({name, field}) => field({
            name,
            view: 'show',
            resource,
            entity,
            editing: {},
            onChange: (v) => console.log('unexpected change on show view: ', v),
        }))}
    </div>
}

export function EditView({resource}: {
    resource: Resource,
}) {
    const {id} = useParams()
    const [_, navigate] = useLocation()
    const entity = useResourceEntity(resource.name, id!)
    const [editing, updateEditing] = useObjectState({})

    return <FormView
        resource={resource}
        view="edit"
        entity={entity}
        editing={editing}
        updateEditing={updateEditing}
        handleSubmit={() => resource.handleSubmit({resource, entity, editing, navigate})}
    />
}


export function CreateView({resource}: {
    resource: Resource,
}) {
    const [_, navigate] = useLocation()
    const entity = {}
    const [editing, updateEditing] = useObjectState({})

    return <FormView
        resource={resource}
        view="create"
        entity={entity}
        editing={editing}
        updateEditing={updateEditing}
        handleSubmit={() => resource.handleSubmit({resource, entity, editing, navigate})}
    />
}

function FormView({resource, view, entity, editing, updateEditing, handleSubmit}: {
    resource: Resource,
    view: ViewType,
    entity: Entity,
    editing: Entity,
    updateEditing: (kvs: Entity) => any,
    handleSubmit: () => any
}) {
    const {fields} = resource
    return <div className="space-y-4">
        {fields.map(({name, field}) => field({
            name,
            view,
            resource,
            entity,
            editing: editing,
            updateEditing,
        }))}
        <div className="flex justify-end">
            <button className="px-1.5 py-1 rounded bg-blue-500 text-white hover:bg-blue-600" onClick={handleSubmit}>Submit</button>
        </div>
        <SimpleJsonViewer value={editing} className="p-4 border border-gray-200 rounded"/>
    </div>
}

