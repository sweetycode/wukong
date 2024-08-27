import type { NamedField } from "./Fields"

export type ResourceRequestType = 'list'|'get'|'update'|'store'|'delete'

export interface ResourceRequestOptions {
    ref: Resource
    type: ResourceRequestType
    id?: number
    navigate: (string) => void
}


export interface Resource {
    name: string  // pluaral name of resource
    fields: NamedField[]
    handleRequest?: (ResourceRequestOptions) => any
}
type PresetFields = "a"


export function createResource({name, fields, handleRequest}: {
    name: string,
    fields: (PresetFields|NamedField)[],
    handleRequest?: (ResourceRequestOptions) => any
}): Resource {
    return null
}