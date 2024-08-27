import type { ComponentChild } from "preact";
import type { IsVisibleInView, ViewType } from "./Views";

interface FieldComponentOptions {
    view: ViewType
    resource: Resource
}

type FieldComponentFactory = (options: FieldComponentOptions) => ComponentChild


export interface Field {
    name: string
    isVisible: IsVisibleInView
    componentFactory: FieldComponentFactory
}



const IdFieldFactory: FieldComponentFactory = ({}) => {
    
}

