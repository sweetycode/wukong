import { FloatLabel, LabeledInput, Select, Textarea } from '../../components/Input';
import { IconEdit, IconEye } from '../../icons/IconFonts';
import { IconLink} from './Controls';
import { Field, FieldProps, ViewType } from './types';
import { useFullscreenToggleState, useHttpBody } from '../../components/hooks';
import _ from '../../utilities/dash';
import AceEditor from '../../integrations/AceEditor';
import { FullscreenContainer } from '../../components/FullscreenContainer';
import Toolbar, { toolbarItemFullscreen } from '../../components/Toolbar';
import { renderMarkdown } from '../../integrations/marked';
import DatetimePicker from '../../integrations/DatetimePicker'

export const IdField: Field = ({view, name, resource, editing, entity}) => {
    const value = editing[name] ?? entity[name] ?? '' + ''

    return <div className="space-x-2">
        {view != 'list' && <span className="text-sm text-gray-700">{name}:</span>}
        <div className="inline space-x-2">
            <span>{value}</span>
            {view != 'show' && <IconLink href={`/${resource.name}/${value}`}><IconEye size="22"/></IconLink>}
            {view != 'edit' && <IconLink href={`/${resource.name}/${value}/edit`}><IconEdit size="22"/></IconLink>}
        </div>
    </div>
}

export const StringField: Field = ({view, editing, name, entity, updateEditing}) => {
    const value = editing[name] ?? entity[name] ?? ''
    if (view == 'list') {
        return value
    }

    return <LabeledInput
        label={name}
        value={value}
        onChange={(newValue) => updateEditing({[name]: newValue})}
        readOnly={view == 'show'}/>
}

export const TextField: Field = ({name, view, editing, entity, updateEditing}) => {
    if (view == 'list' || view == 'show') {
        const display = editing[name] ?? entity[name] ?? '-'
        return view == 'list' ? display: <FloatLabel label={name} fixed>
            <pre className="px-2 py-1 rounded border border-gray-300 max-h-40 text-wrap">{display}</pre>
        </FloatLabel>
    }
    const value = editing[name] ?? entity[name] ?? ''
    return <FloatLabel label={name} value={value}>
        <Textarea value={value} className="h-28" onChange={newValue => updateEditing({[name]: newValue})} />
    </FloatLabel>
}

export const ImageField: Field = ({name, view, editing, entity, updateEditing}) => {
    const value = editing[name] ?? entity[name] ?? ''
    if (view == 'list') {
        return value
    }

    return 'TODO'
}


export const TimestampField: Field = ({name, view, editing, entity, updateEditing}) => {
    if (view == 'list' || view == 'show') {
        const display = editing[name] ?? entity[name] ?? '-'
        return view == 'list' ? display: <LabeledInput label={name} value={display} readOnly/>
    }

    const value = editing[name] ?? entity[name] ?? ''
    return <FloatLabel label={name} value={value}>
        <DatetimePicker value={value} onChange={newValue => updateEditing({[name]: newValue})}/>
    </FloatLabel>

}

export const BelongsToField: Field = ({name, view, editing, entity, updateEditing}) => {
    if (view == 'list' || view == 'show') {
        const display = (entity[name] && entity[name]['name']) ?? '-'
        return view == 'list' ? display: <LabeledInput label={name} value={display} readOnly/>
    }

    const editingName = name + '_id'
    const realValue = editing[editingName] ?? (entity[name] ? entity[name].id: 0)
    const response = useHttpBody(`/admin/api/${_.plural(name)}`, null)

    const unsetOptionItem = {value: 0, text: '-'}
    const options = response && response.data ? response.data.map(({id, name}) => ({value: id, text: name})): []

    return <FloatLabel label={name} fixed={true}>
        <Select value={realValue} options={[unsetOptionItem, ...options]} onChange={newValue => updateEditing({[editingName]: parseInt(newValue)})} />
    </FloatLabel>

}

export const BelongsToManyField: Field = ({name, view, editing, entity, updateEditing}) => {
    if (view == 'list' || view == 'show') {
        const display = (entity[name] ?? []).map(({name}) => name).join(', ') || '-'
        return view == 'list' ? display: <LabeledInput label={name} value={display} readOnly />
    }

    const editingName = name + '_name'
    const value = (editing[editingName] ?? (entity[name] ?? []).map(({name}) => name)).join(', ')
    return <LabeledInput label={name} value={value} onChange={newValue => {
        updateEditing({
            [editingName]: newValue
                                .split(',')
                                .map(s => s.trim())
                                .filter(s => s.length > 0)
        })
    }} />

}

export const JsonField: Field = ({name, view, editing, entity, updateEditing}) => {
    return 'TODO'
}


export const MarkdownField: Field = ({name, view, editing, entity, updateEditing}) => {
    if (view == 'list') {
        return undefined
    }

    const [fullscreen, toggleFullscreen] = useFullscreenToggleState()

    const value = editing[name] ?? entity[name] ?? ''

    return <FloatLabel label={name} fixed>
        <FullscreenContainer fullscreen={fullscreen}>
            <Toolbar items={[
                'gutter',
                toolbarItemFullscreen({fullscreen, toggleFullscreen})
            ]}/>
            <AceEditor
                value={value}
                onChange={markdown =>
                    renderMarkdown({markdown}).then(html => updateEditing({[name]: markdown, generated_html_body: html}))
                }
                lang='markdown'
                className="min-h-[20em] grow"
                readOnly={view == 'show'}/>
        </FullscreenContainer>
    </FloatLabel>
}

export const HtmlField: Field = ({name, view, editing, entity, onChange}) => {
    if (view == 'list') {
        return undefined
    }

    const value = editing[name] ?? entity[name] ?? '' + ''

    if (view == 'show') {
        return <FloatLabel label={name} fixed={true}>
            <div className="border border-gray-300 rounded px-2 py-1" dangerouslySetInnerHTML={{__html: value}} />
        </FloatLabel>
    }

    return 'TODO'
}


export function hideWhen(field: Field, predict: (props: FieldProps) => boolean): Field {
    return (props) => {
        if (predict(props) == true) return undefined
        return field(props)
    }
}

export function hideViews(field: Field, views: ViewType[]): Field {
    return hideWhen(field, ({view}) => views.includes(view))
}

