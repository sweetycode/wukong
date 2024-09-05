import { useErrorCaptureState } from "../../components/hooks"
import { useEffect, useMemo, useRef } from "preact/hooks"
import {default as Viewer} from './jsonviewer'
import './jsonviewer.css'

function typeOfPrimitiveValue(value: any) {
    if (value == null) {
        return `null`
    } else {
        return typeof value
    }
}

export function SimpleJsonStringViewer({value}: {value: string}) {
    const [error, catchError] = useErrorCaptureState()

    const json = useMemo(() => {
        if (value.length > 0) {
            return catchError(() => JSON.parse(value))
        }
    }, [value])

    if (error) {
        return <span className="bg-gray-50 p-4 text-red-700">{error}</span>
    }

    if (value.length == 0) return <></>

    return <SimpleJsonViewer value={json}/>
}

export function SimpleJsonViewer({value}: {value: Object}) {
    return value instanceof Object ? <ObjectOrArrayViewer value={value}/>: <pre className="json-viewer"><ul>
            <li>
                <span class={`type-${typeOfPrimitiveValue(value)}`}>{JSON.stringify(value)}</span>
            </li>
        </ul>
    </pre>
}


function ObjectOrArrayViewer({value}: {value: Object}) {
    const containerRef = useRef(null)
    const viewerRef = useRef(null)
    useEffect(() => {
        const viewer = viewerRef.current = new Viewer()
        containerRef.current.appendChild(viewer.getContainer())
        viewer.showJSON(value);
    }, [])

    useEffect(() => {
        viewerRef.current.showJSON(value);
    }, [value])

    return <div ref={containerRef}></div>
}
