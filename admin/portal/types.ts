import { ComponentChild } from "preact"

export type ViewType = 'list'|'show'|'edit'|'create'

export type Entity = {[key: string]: any}


export interface FieldProps {
    name: string
    resource: Resource
    view: ViewType
    entity: Entity
    editing: Entity
    updateEditing: (entity: Entity) => any
}

export type Field = (props: FieldProps) => ComponentChild


export interface NamedField {
    name: string
    field: Field
}

export type HandleSubmit = ({resource, editing, entity, navigate} :{
    resource: Resource,
    editing: Entity,
    entity: Entity,
    navigate: (string) => void
}) => Promise<any>

export interface Resource {
    name: string
    fields: NamedField[]
    handleSubmit: HandleSubmit
}
