export type ViewType = 'list'|'create'|'edit'|'view'
export type IsVisibleInView = (view: ViewType) => boolean
